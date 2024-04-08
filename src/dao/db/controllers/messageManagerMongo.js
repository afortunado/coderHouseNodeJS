import Messages from "../models/messages.model.js";
import io from "../../../app.js"
 
class MessageManagerMongo {

    getMessage = async(req, res, next) => { res.render("chat", {}) };

    postMessage = async(req, res, next) => {
        const message = req.body.message;

        io.emit('new-message', message);
    
        res.status(200).json({ message: 'Mensaje guardado correctamente' });
    };

};
 
export default MessageManagerMongo;