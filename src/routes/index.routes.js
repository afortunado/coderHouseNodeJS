import { Router } from "express";
import routerCart from "./cart.routes.js";
import routerProd from "./products.routes.js";
import routerUser from './user.routes.js';
import routerChat from './chat.routes.js';
import routerSerssions from "./session.routes.js";
import viewsRouter from "./views.routes.js";
import mockRouter from "./mock.routes.js";
import loggerRouter from "./logger.routes.js";
import apidocsRoute from "./apidocs.routes.js";

const routerIndex = Router();
 
routerIndex.use('/api/products', routerProd);
routerIndex.use('/api/cart', routerCart);
routerIndex.use('/api/user', routerUser);
routerIndex.use('/api/chat', routerChat);
routerIndex.use('/api/sessions', routerSerssions);
routerIndex.use('/', viewsRouter);
routerIndex.use('/', mockRouter);
routerIndex.use("/loggerTest", loggerRouter);
routerIndex.use('/apidocs', apidocsRoute);

export default routerIndex;