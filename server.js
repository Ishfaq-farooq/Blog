const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const checkUser = require('./Middleware/protect');
const Blog = require('./Models/Blog');


const app = express();
const PORT = process.env.PORT;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(checkUser());
app.use("/uploads",express.static(path.resolve("uploads")));

const userRoute = require('./Routes/userRoute');
const blogRoute = require('./Routes/blogRoute');

app.get('/',async (req, res)=>{
const blogs = await Blog.find({});
    
    return res.render("home",{user: req.user, blogs: blogs});
})
app.use('/user',userRoute);
app.use('/blog',blogRoute);




mongoose.connect("mongodb://localhost:27017/blog")
.then(()=>{console.log("mongodb connected successfully")})
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})