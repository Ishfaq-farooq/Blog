const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../Models/Blog');
const Comment = require('../Models/Comment');


const {handleAddBlog} = require('../Controllers/blogController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads/blog'));
  },
  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.get('/addBlog',(req, res)=>{
    if(!req.user){
        return res.redirect('/',{user: null})
    }
    return res.render('addBlog',{user: req.user});
});

router.post('/addBlog',upload.single('image'),handleAddBlog);

router.get('/readBlog/:blogId',async (req, res)=>{
  const blogId = req.params.blogId;
  const blog = await Blog.findOne({_id: blogId}).populate('createdBy');
  const comments = await Comment.find({blogId: blogId}).populate('userId');
  return res.render('blog.ejs',{blog: blog,comments: comments, user: req.user})
});

router.post('/comments/:blogId',async (req, res)=>{
  try{

    const {comment} = req.body;
    const blogId = req.params.blogId;
    const savedComment = await Comment.create({comment: comment, blogId: blogId, userId: req.user._id});
    return res.redirect(`/blog/readBlog/${blogId}`);


  }catch(error){
    
    return res.redirect('/');
  }
})

module.exports = router;