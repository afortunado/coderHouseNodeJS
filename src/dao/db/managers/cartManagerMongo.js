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

cartService.deleteCartProduct = async(cartId, productId) => {
        let currentCart = await Cart.findById(cartId);
        let newCart = await currentCart.products.deleteOne({ _id: productId })
        return newCart;
}

cartService.createTicket = async(cart) => {
        await Ticket.create({ })
        return 
}

export default cartService;