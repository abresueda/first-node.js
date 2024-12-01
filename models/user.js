const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type:String
    },
    email : {
        type:String
    },
    password : {
        type:String
    },
    createdAt : {
        type:Date,
        default:Date.now //veritabanında veri yoksa defaultla hangi verinin oraya koyulması gerektiği belirtilir.
    }
})

//Schemaya servisten erişmek için. 
module.exports = mongoose.model('user', userSchema);

