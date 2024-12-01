const mongoose = require('mongoose');
require('dotenv').config()

async function connectDB() {
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("bağlandık");
    } catch(e){
        console.log(error,'mongoERROR')
    }
}

module.exports = { connectDB }