const express = require('express');
const router = express.Router();
const authenticated = require('./verifyToken');
const User = require("../models/User");

//Seeing how we can use middleware created to a route t make it essentially private
router.get('/',authenticated, (req,res)=>{
    res.json({
        posts:{
            title:"My first post",
            description:"Random data you shouldn't access"
        }
    });
});

// Seeing how we can use the token to get user info
router.get('/user',authenticated, async (req, res) => {
    const user = await User.findOne({_id: req.user});
    res.json(user);
});

module.exports = router;
