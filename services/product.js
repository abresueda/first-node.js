const mongooseProduct = require('../models/product');
const { param } = require('../routes');
const { createClient } = require('redis');

let redisClient;

async function createRedisClient() {
    if(!redisClient){
        redisClient = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    }
    return redisClient;   
}

async function getAllProduct() {
    const key = "showcase";
    try{
        //Redisten veriyi çekmek için.
        const client = await createRedisClient();
        const getShowCase = await client.get(key);
        
        if(getShowCase === null) {
            //İlk veritabanından alıyor, sonrasında redisten alarak daha hızlı işlem yapabiliyoruz.*Cacha Mekanizması*
            const getAllProduct = await mongooseProduct.find();
            await client.set(key, JSON.stringify(getAllProduct));
            return getAllProduct;
        }else{
            return JSON.parse(getShowCase);
        }
        
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function getSingleProduct(params) {
    const id = params.id;
    try{
        const getSingleProduct = await mongooseProduct.findById(id);
        return getSingleProduct;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function createProduct(params) {
    
    const {title, price,color,stock} = params;

    try{
        const newProduct = new mongooseProduct({
            title, 
            price,
            color,
            stock
        })
        newProduct.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function updateProduct(params) {
    const {id, name, price, color, stock } = params;
    try{
        const product = await mongooseProduct.findById(id);
        product.name = name;
        product.price = price;
        product.color = color;
        product.stock = stock;
        const productSave = await product.save();
        console.log(productSave);
        return productSave;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function deleteProduct(params) {
    const id = params;
    try{
        const productDelete = await mongooseProduct.findByIdAndDelete(id);
        
        return productDelete;
    }catch(e){
        console.log(e);
        return false;
    } 
}

module.exports = {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}