const express = require('express'); //Express'i çağırdık.
const routes = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/db');


const app = express();

app.use(express.json());

//url için
app.use(express.urlencoded({ extended: true }));

//Database connect process
config.connectDB();

//localhost:3000
//örnek router
app.get('/test', function(req,res,next) {
    console.log('middleware')
    next();
},
    function(req,res){
    console.log('controller');
    res.status(200).send({success:true});
})
app.use('/api',routes);

app.listen(3000,() =>{
    console.log('ayaktayiz')
})

//status'te her requestte cevap olarak bir http kodu vermemiz gerekir. örneğin: res.status(200,send({ response:'process success'}));