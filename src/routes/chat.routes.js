import { Router } from "express";
import { getMessage, storeMessage } from "../controllers/chatControllers.js"
import { checkRole } from "../config/authMiddleware.js";

const routerChat = Router();

routerChat.post('/sendMsg', checkRole(['user']), storeMessage);

routerChat.get('/', getMessage);

export default routerChat;