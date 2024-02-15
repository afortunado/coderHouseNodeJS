import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: Array
    }
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;