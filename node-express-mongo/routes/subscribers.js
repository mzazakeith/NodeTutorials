const express = require('express');
const Subscriber = require('../models/subscriber');
const router = express.Router();

//Getting All
router.get("/", (req, res)=>{
    res.send("Hello")
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
