//require statements and related
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');
const app = express();

// database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database..."));

app.use(express.json());
app.use('/subscribers/api', subscribersRouter);
const port = process.env.PORT || 3002;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.....`)
})
