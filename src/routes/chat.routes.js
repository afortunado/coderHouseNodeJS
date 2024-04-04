import { Router } from "express";
import io from "../app.js"
const routerChat = Router();

routerChat.get('/', (req, res) => {
    res.render("chat", {})
});

routerChat.post('/', (req, res) => {
    const message = req.body.message;

    io.emit('new-message', message);

    res.status(200).json({ message: 'Mensaje guardado correctamente' });
});

export default routerChat;