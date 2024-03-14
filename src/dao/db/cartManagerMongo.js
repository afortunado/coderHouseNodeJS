import Cart from '../db/models/cartModel.js'

class CartManagerMongo {

    async getCart() {
        try {
            await Cart.create({ date: new Date() });
            const carts = await Cart.find();
            return carts;
        } catch (err) {
            return err;
        }
    }

    async getCartById(cartId) {
        try {
            const findCart = await Cart.findOne({ _id: cartId }).populate('products.product');
            if (!findCart) {
                throw new Error("Cart not founded");
            }
            return findCart;
        } catch (err) {
            console.log("Something happened")
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            let currentCart = await Cart.findById(cartId);
            currentCart.products.push({ product: productId });

            await currentCart.save();

            return currentCart;
        } catch (err) {
            console.error('Error creating cart: ' + err.message);
        }
    }

    async updateCart(idCart, idProduct, quantity) {
        try {
            let currentCart = await Cart.findById(idCart);
            let existingProduct = currentCart.products.find(e => e.product.equals(idProduct));
            existingProduct.quantity += quantity.quantity;

            await currentCart.save();

            return currentCart;
        } catch (err) { throw new Error(err) }
    }

    async deleteCartProduct(cartId, productId) {
        try {
            let currentCart = await Cart.findById(cartId);
            let newCart = await currentCart.products.deleteOne({ _id: productId })

            await newCart.save();

            return newCart;

        } catch (err) {
            console.error('Error deleting product: ' + err.message);
        }
    }

};

export default CartManagerMongo;