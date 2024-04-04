import { Router } from "express"; 
//import CartManager from '../dao/cartManager.js';
//const cart = new CartManager('cartFile.json');
import CartManagerMongo from '../dao/db/controllers/cartManagerMongo.js'
const routerCart = Router();
const cartManager = new CartManagerMongo();

routerCart.post("/", cartManager.getCart);

routerCart.post("/:cid/product/:pid", cartManager.addProductToCart);

routerCart.get("/:cid", cartManager.getCartById);

routerCart.put("/:cid/product/:pid", cartManager.updateCart);

routerCart.delete("/:cid/product/:pid", cartManager.deleteCartProduct);

export default routerCart;