const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:4,
        max:255
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true,
        min:8
    },
    date_created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);