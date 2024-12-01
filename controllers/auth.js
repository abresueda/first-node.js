const userService = require('../services/user')
const authService = require('../services/auth');
const { message } = require('statuses');

const authController = {
    login: async(req,res)=>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({message:"email and password required"})
        }

        try{
            const response = await authService.login(req.body);
            //userService.createUser(req.body);
            
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    register:async(req,res) => {
        const response = await userService.createUser(req.body);
        res.status(200).send({response:response})
    }
}
module.exports = authController