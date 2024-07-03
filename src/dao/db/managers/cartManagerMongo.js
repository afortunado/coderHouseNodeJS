import Cart from '../models/cartModel.js'
import Ticket from '../models/ticketModel.js'
import Product from '../models/productModel.js'
import uuid4  from 'uuid4'

const cartService = {}

cartService.getCart = async () => {
        await Cart.create({ date: new Date() })
        return await Cart.find();
}

cartService.getCartById = async(cartId) => {
        return await Cart.findOne({ _id: cartId }).populate('products.product');
}

cartService.addProductToCart = async(cartId, productId) => {
        let currentCart = await Cart.findOne({ _id: cartId }).populate('products.product');
        let existingProduct = currentCart.products.find(e => e.product.equals(productId));
        if(!existingProduct){
                currentCart.products.push({ product: productId, quantity: 1})
        } else { existingProduct.quantity ++; }
    
        let newCart = await currentCart.save();
        return newCart;
}

cartService.deleteCartProduct = async(cartId, productId) => {
        let currentCart = await Cart.findById(cartId);
        if(!currentCart){
                throw new Error("Cart doesn't exist");
        }
        let newCart = await currentCart.products.deleteOne({ _id: productId })
        return newCart;
}

cartService.deleteAllProducts = async(cartId) => {
        let currentCart = await Cart.findById(cartId);
        if(!currentCart){
                throw new Error("Cart doesn't exist");
        }
        const newCart = await Cart.updateOne({ _id: cartId }, { $unset: { products: 1 } });
        return newCart;
}

cartService.createTicket = async(cart) => {
        console.log(cart.products[0].product.price)
     try{
         for (cartProduct of cart.products) {
                const { product } = cartProduct;
                const { quantity, stock } = product;
            
                if (quantity <= stock) {
                    product.stock -= quantity;
                    await Product.findOneAndUpdate(
                        { _id: product._id },
                        { $set: { stock: product.stock } }
                    );
                } else {
                    throw new Error("There is no enough stock");
                }
            };
            
        const code = uuid4()
        const totalAmount = cart.products.reduce((total, product) => {
                const { price, quantity } = product.product;
                return total + price * quantity;
            }, 0);
        const ticket = await Ticket.create({
                code: code,
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: "userEmail"
         })
         return ticket;
        } catch(err){ throw new Error(err)}
        
}

export default cartService;