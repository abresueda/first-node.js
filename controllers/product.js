const { message } = require('statuses');
const productService = require('../services/product')
const kafka = require('../utils/kafka');

const productController = {
    createProduct: async(req,res)=>{
        const {name, color, price, stock} = req.body;
        if(!name) {
            return res.status(502).send({message:"name is required"})
        }
        if(!price) {
            return res.status(502).send({message:"price is required"})
        }
        try{
            const response = await productService.createProduct(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    updateProduct: async(req,res)=>{
        const {name, color, price, stock} = req.body;
        if(!name) {
            return res.status(502).send({message:"name is required"})
        }
        if(!price) {
            return res.status(502).send({message:"price is required"})
        }
        try{
            const response = await productService.updateProduct(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
    },
    deleteProduct: async(req,res)=>{
        const {id} = req.body;
        if(!id) {
            return res.status(502).send({message:"id is required"});
        }
        try{
            const response = await productService.deleteProduct(id);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
    getAllProduct: async(req,res)=>{
        try{
            const response = await productService.getAllProduct();
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }  
    },
    getSingleProduct: async(req,res)=>{
        try{
            const response = await productService.getSingleProduct(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
}

module.exports = productController;