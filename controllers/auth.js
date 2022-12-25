const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesToResponse} = require('../utils')

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
    attachCookiesToResponse({res,user: tokenUser})

    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req,res) =>{
    const {email, password} = req.body

    if(!email || !password){
        throw new CustomError.BadRequestError("please provide email and password")
    }

    let user = await User.findOne({email})

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookiesToResponse({res,user: tokenUser})
    res.json({
        user
    })
}

const logout = async (req,res) =>{
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
    })

    res.json({})
}

module.exports = {
    register,login,logout
}