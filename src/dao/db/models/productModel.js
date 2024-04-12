import mongoose from "mongoose";
import mongoPaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array
    },
    code: {
        type: Number,
        unique: true,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: ["food", "drinks", "stuff"],
        index: true
    },
    status: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: String,
        default: 0
    }
});

ProductSchema.plugin(mongoPaginate);

const Product = mongoose.model('Product', ProductSchema);

export default Product;