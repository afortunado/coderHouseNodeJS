import { Router } from "express"; 
//import CartManager from '../dao/cartManager.js';
//const cart = new CartManager('cartFile.json');
import { getCart, getCartById, addProductToCart, deleteAllProducts, deleteCartProduct, createTicket } from '../controllers/cartControllers.js'
import { checkRole } from "../config/authMiddleware.js";

const routerCart = Router();

routerCart.post("/", getCart);

routerCart.post("/:cid/product/:pid", checkRole(['user']), addProductToCart);

routerCart.get("/:cid", getCartById);

routerCart.put("/:cid/product/:pid", checkRole(['user']), addProductToCart);

routerCart.delete("/:cid/product/:pid", deleteCartProduct);

routerCart.delete("/:cid", deleteAllProducts);

routerCart.get("/:cid/purchase", createTicket)

export default routerCart;