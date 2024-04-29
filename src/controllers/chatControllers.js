import chatService from '../dao/db/managers/messageManagerMongo.js';
import io from '../app.js'
 
export const storeMessage = async(req, res, next) => {
    const user = req.body;
    try {
        const msgAdded = await chatService.addMessage(user);
        io.emit('new-message', msgAdded);
        res.status(200).json(msgAdded);
    } catch (error) {
        next(error);
    }
}

export const getMessage = async (req, res, next) => {
    try {
        let message = await chatService.getMessage();
        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
};
 
  


