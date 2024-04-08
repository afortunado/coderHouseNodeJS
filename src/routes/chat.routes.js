import { Router } from "express";
import MessageManagerMongo from "../dao/db/controllers/messageManagerMongo.js"
const routerChat = Router();
const chatManager = new MessageManagerMongo;

routerChat.get('/', chatManager.getMessage);

routerChat.post('/', chatManager.postMessage);

export default routerChat;