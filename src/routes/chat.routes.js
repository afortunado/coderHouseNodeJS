import { Router } from "express";
import MessageManagerMongo from "../dao/db/managers/messageManagerMongo.js"
const routerChat = Router();
const { getMessage, postMessage } = MessageManagerMongo;

routerChat.get('/', getMessage);

routerChat.post('/', postMessage);

export default routerChat;