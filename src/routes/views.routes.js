 import { Router } from  'express';
 import { renderProducts, renderChat } from '../controllers/viewsControllers.js';
 const viewsRouter = Router();

 viewsRouter.get("/products", renderProducts);
 viewsRouter.get("/chat", renderChat);

 export default viewsRouter; 