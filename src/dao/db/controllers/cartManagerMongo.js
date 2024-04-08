import Cart from '../models/cartModel.js'

class CartManagerMongo {

    getCart = async(req, res, next) => {
        try {
            await Cart.create({ date: new Date() });
            const theCart = await Cart.find();
            return res.status(200).json(theCart);
        } catch (err) {
            next(err);
        } 
    }

    getCartById = async(req, res, next) => {
        const cartId = req.params.cid;
        try {
            const findCart = await Cart.findOne({ _id: cartId }).populate('products.product');
            if (!findCart) {
                throw new Error("Cart not founded");
            }
            return res.status(200).json(findCart);
        } catch (err) {
            next(err);
        }
    }
 
    addProductToCart = async(req, res, next) => {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        try {
            let currentCart = await Cart.findById(cartId);
            currentCart.products.push({ product: productId });

            await currentCart.save();

            return res.status(200).json(currentCart);
        } catch (err) {
            next(err);
        }
    }

    updateCart = async(req, res, next)=> {
            const idCart = req.params.cid;
            const idProduct = req.params.pid;
            const quantity = req.body;
        try {
            let currentCart = await Cart.findById(idCart);
            let existingProduct = currentCart.products.find(e => e.product.equals(idProduct));
            existingProduct.quantity += quantity.quantity;

            await currentCart.save();

            return res.status(200).json(currentCart);
        } catch (err) { next(err) }
    }

    deleteCartProduct = async(req, res, next) => {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        try {
            let currentCart = await Cart.findById(cartId);
            let newCart = await currentCart.products.deleteOne({ _id: productId })

            await newCart.save();

            return res.status(200).json(newCart);

        } catch (err) {
            next(err);
        }
    }

};

export default CartManagerMongo;