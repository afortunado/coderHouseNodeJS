import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProd from "./products.routes.js";
import routerUser from './user.routes.js';
import routerChat from './chat.routes.js';
import viewsRouter from "./views.routes.js";

const routerIndex = Router();
 
routerIndex.use('/api/products', routerProd);
routerIndex.use('/api/cart', routerCart);
routerIndex.use('/api/user', routerUser);
routerIndex.use('/api/chat', routerChat);
routerIndex.use('/', viewsRouter);

export default routerIndex;