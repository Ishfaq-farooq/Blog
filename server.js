const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');


const app = express();
const PORT = process.env.PORT;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const userRoute = require('./Routes/userRoute')

app.get('/',(req, res)=>{
    return res.render("home");
})
app.use('/user',userRoute);




mongoose.connect("mongodb://localhost:27017/blog")
.then(()=>{console.log("mongodb connected successfully")})
.catch((err)=>{console.log("MongoDB connection error:", err.message)});
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})