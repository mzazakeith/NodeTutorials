const express = require('express');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const textAPI = require('../services/sms');
const {validateRegistration, validateLogin} = require("../validation");
const {generateOTP} = require("../services/otp");
const router = express.Router();

// Register
router.post("/register", async (req, res)=>{
    // Validation of data
    const result = validateRegistration(req.body);
    const {error} = result;
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email is there
    const emailExist = await User.findOne({email:req.body.email});
    const phoneExist = await User.findOne({phoneNumber:req.body.phoneNumber});
    if(phoneExist) return res.status(409).json({message:"User with this phone number already exists. Please Log In"});
    if(emailExist) return res.status(409).json({message:"User with this email already exists. Please Log In"});

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const otp = await generateOTP();

    //The new user object
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phoneNumber: req.body.phoneNumber,
        otp:otp,
        password:hashedPassword,
    })
    // saving the user object
    try{
        const newUser = await user.save();
        try{
            await textAPI.sendSMS(newUser.phoneNumber, newUser.otp);
        }catch (e){
            res.status(400).json({info:"User saved but OTP not sent",message:e.message});
        }
        res.status(201).json(newUser);
    }catch (e) {
        res.status(400).json({message:e.message});
    }
});

//Login
router.post("/login", async (req, res)=>{
    // Validation of data
    const result = validateLogin(req.body);
    const { error} = result;
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email is there
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:"Bad credentials. Please sign up or put the correct credentials"});

    // check if password match
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({message:"Bad credentials. Please sign up or put the correct credentials"});

    //create and assign a token
    const token = jwt.sign({_id:user.id}, process.env.TOKEN_SECRET);
    res.header("Authorization", `Bearer ${token}`).json({access_token:token});
});


module.exports = router;
