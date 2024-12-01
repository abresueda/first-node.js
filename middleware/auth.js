//Loginden gelen kullanıcının bilgileri eşleşiyorsa, jwt token verilir. Ona göre geçiş yapılır.
const jwt = require ('jsonwebtoken');
require('dotenv').config()
const { message } = require('statuses');

const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1]; //Tokeni ayrıştırıp dizinin ikinci elemanını alıyoruz.
    if(!token){
        return res.status(401).json({message:'no token provided'}); //401 yetkisiz erişim demek.
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next(); //Hepsi yolundaysa next ile sonraki adıma geçer.
    }catch(e){
        res.status(401).json({message:"invalid token"})
    }
}

//urlden geleni params ile alıyoruz.

module.exports = authMiddleware