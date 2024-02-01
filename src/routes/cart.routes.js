import { Router } from "express";
import CartManager from '../models/cartManager.js';
const cart = new CartManager('cartFile.json');
const routerCart = Router();

routerCart.post("/", async (req, res) => {
    try { let theCart = await cart.createCart(); res.status(200).json(theCart); }
    catch (err) { res.status(404).json(`Error retrieving products: ${err.message}`) }
})

routerCart.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    try {
        let theCart = await cart.addProductToCart(cartId, productId)
        res.status(200).json(theCart);
    } catch (err) { res.status(404).json(`Something went wrong: ${err.message}`) }
})

routerCart.get("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    try {
        let cartById = await cart.getCartById(cartId);
        res.status(200).json(cartById.products);
    } catch (err) { res.status(404).json(`Error retrieving product: ${err.message}`) }

})



export default routerCart;