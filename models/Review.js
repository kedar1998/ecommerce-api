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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Review", reviewSchema)