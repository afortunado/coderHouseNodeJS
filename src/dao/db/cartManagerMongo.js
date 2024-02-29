import Cart from '../db/models/cartModel.js'

class CartManagerMongo {

    async getCart() {
        try {
            await Cart.create({ date: new Date() });
            const carts = await Cart.find();
            console.log(carts)
            return carts;
        } catch (err) {
            return err;
        }
    }

    async getCartById(cartId) {
        try {
            const findCart = await Cart.findOne({ _id: cartId }).populate('products.product');
            console.log(JSON.stringify(findCart, null, '\t'))
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
            const existingProduct = currentCart.products.find(e => e.product.equals(productId));

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                currentCart.products.push({ product: productId });
            }
            currentCart.quantity += 1;

            await currentCart.save();

            return currentCart;
        } catch (err) {
            console.error('Error creating cart: ' + err.message);
        }
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

    async deleteCart(cartId) {
        try {
            let deletedCart = await Cart.deleteOne({ _id: cartId })
            return deletedCart;
        } catch (err) {
            throw new Error("Error: ", err)
        }
    }
};

export default CartManagerMongo;