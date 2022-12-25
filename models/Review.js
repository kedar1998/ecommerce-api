const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating: {
        type: String,
        min:1,
        max:5,
        required: [true, "please provide rating"]
    },
    title: {
        type: String,
        trim: true,
        required: [true, "please provide review title"],
        maxlength: 100,
    },
    comment: {
        type: String,
        required: [true, "please provide review text"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
}, {timestamps: true});

reviewSchema.index({product: 1, user: 1}, {unique: true})

module.exports = mongoose.model("Review", reviewSchema)