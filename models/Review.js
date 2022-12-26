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

reviewSchema.statics.calculateAverageRating = async function(productId){
    console.log(productId);
}

reviewSchema.post("save", async function(next){
    await this.constructor.calculateAverageRating(this.product)
})

reviewSchema.post("remove", async function(next){
    await this.constructor.calculateAverageRating(this.product)
})

module.exports = mongoose.model("Review", reviewSchema)