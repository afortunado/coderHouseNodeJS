import mongoose from "mongoose";
import mongoPaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: Array
    },
    code: {
        type: Number,
        unique: true,
        require: true
    },
    stock: {
        type: Number,
        require: true,
        default: 0,
        index: true
    },
    category: {
        type: String,
        require: true,
        enum: ["food", "drinks", "stuff"],
        index: true
    },
    status: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 0
    }
});

ProductSchema.plugin(mongoPaginate);

const Product = mongoose.model('Product', ProductSchema);

export default Product;