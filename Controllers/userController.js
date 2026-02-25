const User = require('../Models/User');
const handleUserSignup = async (req , res)=>{
    try{
        const {name, email, password} = req.body;
        
        // Validation
        if(!name || !email || !password){
            return res.render('signup', {error: 'All fields are required'});
        }
        
        const user = await User.findOne({email});
        if(user){
            return res.render('signup', {error: 'Email already registered'});
        }
        
        await User.create({email, name, password});
        return res.redirect('/');

    }
    catch( error){
        console.error(error);
        return res.render('signup', {error: 'Signup failed. Please try again'});
    }
}


module.exports = {handleUserSignup}