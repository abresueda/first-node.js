const { message } = require('statuses');
const orderService = require('../services/order')
const kafka = require('../utils/kafka');

const orderController = {
    createOrder: async(req,res)=>{
        const {userId, products} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"})
        }
        if(!products) {
            return res.status(502).send({message:"products is required"})
        }
        try{
            const response = await orderService.createOrder(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    updateOrder: async(req,res)=>{
        const {userId, products} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"})
        }
        if(!products) {
            return res.status(502).send({message:"products is required"})
        }
        try{
            const response = await orderService.updateOrder(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
    },
    deleteOrder: async(req,res)=>{
        const {id} = req.body;
        if(!id) {
            return res.status(502).send({message:"id is required"});
        }
        try{
            const response = await orderService.deleteOrder(id);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
    getAllOrder: async(req,res)=>{
        try{
            const response = await orderService.getAllOrder();
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }  
    },
    getSingleOrder: async(req,res)=>{
        try{
            const response = await orderService.getSingleOrder(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
}

module.exports = orderController;