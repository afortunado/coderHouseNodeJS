import { Router } from "express"; 
//import CartManager from '../dao/cartManager.js';
//const cart = new CartManager('cartFile.json');
import { getCart, getCartById, addProductToCart, updateCart, deleteCartProduct, createTicket } from '../controllers/cartControllers.js'
const routerCart = Router();

routerCart.post("/", getCart);

routerCart.post("/:cid/product/:pid", addProductToCart);

routerCart.get("/:cid", getCartById);

routerCart.put("/:cid/product/:pid", updateCart);

routerCart.delete("/:cid/product/:pid", deleteCartProduct);

routerCart.get("/:cid/purchase", createTicket)

export default routerCart;