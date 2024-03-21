import { Router } from "express";
const routerChat = Router();

routerChat.get('/chat', (req, res) => {
    res.render("chat", {})
});

export default routerChat;