import { Router } from "express"; 
//import CartManager from '../dao/cartManager.js';
//const cart = new CartManager('cartFile.json');
import CartManagerMongo from "../dao/db/controllers/cartManagerMongo.js";
const { getCart, getCartById, addProductToCart, updateCart, deleteCartProduct } = CartManagerMongo;
const routerCart = Router();

routerCart.post("/", getCart);

routerCart.post("/:cid/product/:pid", addProductToCart);

routerCart.get("/:cid", getCartById);

routerCart.put("/:cid/product/:pid", updateCart);

routerCart.delete("/:cid/product/:pid", deleteCartProduct);

export default routerCart;