import { Router } from "express";
//import CartManager from '../dao/cartManager.js';
//const cart = new CartManager('cartFile.json');
import CartManagerMongo from '../dao/db/cartManagerMongo.js'
const routerCart = Router();
const cartManager = new CartManagerMongo();

routerCart.post("/", async (req, res) => {
    try { let theCart = await cartManager.getCart(); res.status(200).json(theCart); }
    catch (err) { res.status(404).json(`Error retrieving products: ${err.message}`) }
})

routerCart.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    try {
        let theCart = await cartManager.addProductToCart(cartId, productId)
        res.status(200).json(theCart);
    } catch (err) { res.status(404).json(`Something went wrong: ${err.message}`) }
})

routerCart.get("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    try {
        let cartById = await cartManager.getCartById(cartId);
        res.status(200).json(cartById.products);
    } catch (err) { res.status(404).json(`Error retrieving product: ${err.message}`) }

})

routerCart.put("/:cid/product/:pid", async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        await cartManager.updateCart(idCart, idProduct, req.body);
        res.status(200).json("Product updated successfully");
    } catch (err) { res.status(404).json(`Couldn't update product: ${err.message}`); }
})

routerCart.delete("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    try {
        let newCart = await cartManager.deleteCartProduct(cartId, productId)
        res.status(200).json("Product deleted: ", newCart);
    } catch (err) { res.status(404).json(`Something went wrong: ${err.message}`) }
})

export default routerCart;