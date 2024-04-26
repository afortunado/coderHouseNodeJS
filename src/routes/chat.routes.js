import { Router } from "express";
import { getMessage, storeMessage } from "../controllers/chatControllers.js"
const routerChat = Router();

routerChat.post('/', storeMessage);

routerChat.get('/', getMessage);

export default routerChat;