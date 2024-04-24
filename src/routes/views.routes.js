 import { Router } from  'express';
 import { renderProducts, renderMsg } from '../controllers/viewsControllers.js';
 const viewsRouter = Router();

 viewsRouter.get("/products", renderProducts);
 viewsRouter.get("/chat", renderMsg);

 export default viewsRouter;  