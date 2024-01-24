import { promises as fsPromises } from 'fs';
import uuid4 from 'uuid4';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        let cartId = uuid4();
        let products = [];
        const cart = {
            products: products,
            id: cartId
        }
        try {
            const existingCart = await this.getCart();
            const updatedCart = [...existingCart, cart];
            const updatedFile = JSON.stringify(updatedCart, null, 2);
            await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
            console.log('Cart created successfully.');
            return updatedCart;
        } catch (err) {
            console.error('Error creating cart:' + err.message);
        }
    }

    async getCart() {
        try {
            const readedFile = await fsPromises.readFile(this.path, 'utf-8')
            const cart = JSON.parse(readedFile);
            return cart;
        } catch (err) {
            return [];
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.getCart();
            const findCart = cart.find((e) => e.id === cartId)
            if (!findCart) {
                throw new Error(`Cart not founded: ${id}`);
            }
            return findCart;
        } catch (err) {
            console.log("Something happened")
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            let quantity = 1;
            let currentCart = await this.getCartById(cartId);
            const product = currentCart.products;
            const findProduct = product.find(e => e.product == productId);

            if (!findProduct) {
                currentCart.products.push({ "product": productId, "quantity": quantity })
            } else {
                findProduct.quantity++;
            }

            let existingCart = await this.getCart();
            existingCart = [currentCart];
            const updatedFile = JSON.stringify(existingCart, null, 2);
            await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
            return existingCart
        } catch (err) {
            console.error('Error creating cart:' + err.message);
        }
    }
}

export default CartManager;