import chatService from '../dao/db/managers/messageManagerMongo.js';

export const getMessage = async (req, res, next) => {
    try {
        const msg = await chatService.getMessage();
        res.status(200).json(msg);
        return msg;
    } catch (error) {
        next(error);
    }
};
 
export const postMessage = async(req, res, next) => {
        const { user, message } = req.body;
        try {
            const msgAdded = await chatService.addMessage(user, message);
            return res.status(200).json(msgAdded);
        } catch (error) {
            next(error);
        }
}