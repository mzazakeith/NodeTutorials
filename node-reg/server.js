require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const app = express();

//DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database..."));

//middleware
app.use(express.json());

//Import Routes
app.use('/api/user', authRouter);
app.use('/api/post', postRouter);

const port = process.env.PORT || 3002;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.....`)
})
