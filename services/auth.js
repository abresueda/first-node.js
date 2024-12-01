const brcypt = require('bcrypt');
const mongooseUser = require('../models/user');
const jwt = require('jsonwebtoken')
const { message } = require('statuses');

async function login(userParams) {
    //req.body'den alınan değerler.
    const {email,password} = userParams;

    try{
        const user = await mongooseUser.find({email:email});
        console.log(user, "user")
        if(!user){
            return res.status(401).json({message:'invalid username or password'})
        }
        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return token;
    }catch(e){
        console.log(e);
        return false;
    } 
}
module.exports = {
    login
}