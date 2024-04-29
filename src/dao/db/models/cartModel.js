import mongoose from "mongoose";
 
const CartSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    products: {
        type: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        }]
    }
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;