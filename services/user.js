const brcypt = require('bcrypt');
const mongooseUser = require('../models/user');


async function createUser(userParams) {
    //req.body'den alınan değerler.
    const {username,email,password} = userParams;

    try{
        const hashedPassword = brcypt.hashSync(password,10);
        const newUser = new mongooseUser({
            username,
            email,
            password:hashedPassword
        })
        newUser.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function getUser(userParams) {
    //req.body'den alınan değerler.
    const {id} = userParams;

    try{
        const newUser = await mongooseUser.findById(id);
        
        return newUser;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function getUsers(userParams) {

    try{
        const newUser = await mongooseUser.find();
        
        return newUser;
    }catch(e){
        console.log(e);
        return false;
    } 
}

async function updateUser(userParams){
    const id= userParams.id;
    const email = userParams.email;
    
    try {
        const user = await mongooseUser.findById(id);
        user.email = email;
        const userSave = await user.save();
        console.log(userSave);
        return userSave;
    } catch(e) {
        console.log(e);
        return false;
    }
}

async function deleteUser(userParams) {
    const id = userParams.id;
    try{
        const userDelete = await mongooseUser.findByIdAndDelete(id);
        return userDelete;
    } catch(e){
        console.log(e,"error");
        return false;
    } 
    
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers
}