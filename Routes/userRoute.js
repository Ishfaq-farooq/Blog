const express = require('express');
const router = express.Router();

const {handleUserSignup} = require('../Controllers/userController');

router.get('/login',(req, res)=>{
    return res.render('login');
});
router.get('/signup',(req, res)=>{
    return res.render('signup');
});

// router.post('/login');
router.post('/signup',handleUserSignup);


module.exports = router;