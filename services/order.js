const mongooseOrder = require('../models/order');
const { param } = require('../routes');
const kafka = require('../utils/kafka');
 
async function getAllOrder() {
    try{
        const getAllOrder = await mongooseOrder.find();
        return getAllOrder;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function getSingleOrder(params) {
    const id = params.id;
    try{
        const getSingleOrder = await mongooseOrder.findById(id);
        return getSingleOrder;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function createOrder(params) {
    
    const {userId, products} = params;

    try{
        const newOrder = new mongooseOrder({
            userId, 
            products,
        })
        newOrder.save();
        if(newOrder) {
        kafka.sendMessage('order',`orderId:${newOrder.id}`);
        return true;
        } else {
             return false;
        }
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function updateOrder(params) {
    const {id, name, price, color, stock } = params;
    try{
        const order = await mongooseOrder.findById(id);
        product.name = name;
        product.price = price;
        product.color = color;
        product.stock = stock;
        const OrderSave = await product.save();
        console.log(productSave);
        return productSave;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function deleteOrder(params) {
    const id = params;
    try{
        const orderDelete = await mongooseOrder.findByIdAndDelete(id);
        
        return orderDelete;
    }catch(e){
        console.log(e);
        return false;
    } 
}

module.exports = {
    getAllOrder,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
}