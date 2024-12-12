const basketService = require('../services/basket')

const basketController = {
    createBasket: async(req,res)=>{
        const {userId, product} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"})
        }
        if(!product.productId) {
            return res.status(502).send({message:"productId is required"})
        }
        try{
            const response = await basketService.addToCart(req.body);
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    updateBasket: async(req,res)=>{
        const {userId, products} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"})
        }
        if(!products) {
            return res.status(502).send({message:"products is required"})
        }
        try{
            const response = await basketService.updateBasket(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
    },
    deleteBasket: async(req,res)=>{
        const {userId,productId} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"});
        }
        if(!productId) {
            return res.status(502).send({message:"productId is required"});
        }
        try{
            const response = await basketService.removeFromCart(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
    clearBasket:async(req,res)=>{
        const {userId} = req.body;
        if(!userId) {
            return res.status(502).send({message:"userId is required"});
        }
        try{
            const response = await basketService.clearBasket(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }  
    },
    getBasket: async(req,res)=>{
        try{
            const response = await basketService.getBasket(req.params);
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }  
    },
    getSingleBasket: async(req,res)=>{
        try{
            const response = await basketService.getSingleBasket(req.body);
            console.log(response, 'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }   
    },
}

module.exports = basketController;