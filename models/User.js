const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        validate: {
            message: 'please provide valide email',
            validator: validator.isEmail,
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

userSchema.pre("save", async function(){
    if(!this.isModified('password')) return ;
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)