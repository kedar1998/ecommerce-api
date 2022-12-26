const { required } = require('joi')
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        maxlength: [100, "name cannot be more than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [1000, "description cannot be more than 1000 characters"]
    },
    image: {
        type: String,
        default: '/uploads/example.jpeg',
    },
    category: {
        type: String,
        required: [true, "product category is required"],
        enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
        type: String,
        required: [true, "company is required"],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported',
        }
    },
    colors: {
        type: [String],
        required: [true, "color is required"],
        default: ['#222']

    },
    featured: {
        type: Boolean,
        default: false,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Number,
        required: true,
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {timestamps: true, toJSON:{virtuals: true}, toObject: {virtuals: true}})


productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
    // match: {rating: 4}
})


module.exports = mongoose.model("Product", productSchema)