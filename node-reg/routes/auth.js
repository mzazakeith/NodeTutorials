const express = require('express');
const User = require("../models/User");
const {validateRegistration}=require("../validation")
const router = express.Router();


router.post("/register", async (req, res)=>{
    const result = validateRegistration(req.body);
    const {error} = result;
    if(error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch (e) {
        res.status(400).json({message:e.message});
    }
});


module.exports = router;
