const CustomError = require("../errors")
const {isTokenValid} = require('../utils')

const authenticateUser = async (req,res,next) =>{

    const token = req.signedCookies.token
    
    if(!token){
        console.log('No token present');
    }
    
    console.log(token);

    next()
}

module.exports = authenticateUser