import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProd from "./products.routes.js";
import routerUser from './user.routes.js';
import routerChat from './chat.routes.js';

const routerIndex = Router();
 
routerIndex.use('/api/products', routerProd);
routerIndex.use('/api/cart', routerCart);
routerIndex.use('/api/user', routerUser);
routerIndex.use('/api/chat', routerChat);

export default routerIndex;