 import { Router } from  'express';
 import { renderProducts, renderMsg, renderRegister, renderLogin } from '../controllers/viewsControllers.js';
 const viewsRouter = Router();

 viewsRouter.get("/products", renderProducts);
 viewsRouter.get("/chat", renderMsg);
 viewsRouter.get("/register", renderRegister);
 viewsRouter.get("/login", renderLogin);

 export default viewsRouter;