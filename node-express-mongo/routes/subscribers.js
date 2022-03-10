const express = require('express');
const Subscriber = require('../models/subscriber');
const router = express.Router();

//Getting All
router.get("/",async (req, res)=>{
    try{
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    }catch (e) {
        res.status(500).json({message:e.message});
    }
});
//Getting One
router.get("/:id", (req, res)=>{

});
//Creating One
router.post("/", (req, res)=>{

});
//Updating One
router.patch("/:id", (req, res)=>{

});
//Deleting One
router.delete("/:id", (req, res)=>{

});

module.exports = router;
