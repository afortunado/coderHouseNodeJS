import Cart from '../models/cartModel.js'
import Ticket from '../models/ticketModel.js'

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
        await Ticket.create({ })
        return await Ticket.find();
}

export default cartService;