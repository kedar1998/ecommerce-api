const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {createJWT} = require('../utils')

const register = async (req,res) =>{
    const {email,name,password} = req.body

    const emailAlreadyExists = await User.findOne({email})

    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already Exists')
    }

    // first user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name,email,password,role})

    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    const token = createJWT({payload: tokenUser})

    res.status(StatusCodes.CREATED).json({user, token})
}

const login = async (req,res) =>{
    res.send("Login")
}

const logout = async (req,res) =>{
    res.send("Logout")
}

module.exports = {
    register,login,logout
}