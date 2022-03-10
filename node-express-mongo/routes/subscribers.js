const express = require('express');
const Subscriber = require('../models/subscriber');
const router = express.Router();

const getSubscriber = async (req, res, next) => {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(!subscriber){
            return res.status(404).json(`Subscriber with id: ${req.params.id} was not found`)
        }
    } catch (e) {
        res.status(500).json({message:e.message});
    }
    res.subscriber = subscriber
    next();
}
//Getting All
router.get("/",async (req, res)=>{
    try{
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
});
//Getting One
router.get("/:id",getSubscriber,(req, res)=>{
    res.send(res.subscriber);
});
//Creating One
router.post("/", async (req, res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.channel,
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }catch (e) {
        res.status(400).json({message:e.message});
    }
});
//Updating One
router.patch("/:id",getSubscriber, async (req, res) => {
    if (req.body.name) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.channel) {
        res.subscriber.subscriberToChannel = req.body.channel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.status(200).json(updatedSubscriber);
    } catch (e) {
        res.status(400).json({message:e.message});
    }

});
//Deleting One
router.delete("/:id",getSubscriber, async (req, res)=>{
    try {
        await res.subscriber.remove()
        res.status(200).json({message:"Successfully deleted"});
    }catch (e) {
        res.status(500).json({message:e.message});
    }
});

module.exports = router;
