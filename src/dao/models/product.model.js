import mongoose from "mongoose";

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
        default: 0
    },
    category: {
        type: String,
        require: true,
        enum: [food, drinks, stuff]
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;