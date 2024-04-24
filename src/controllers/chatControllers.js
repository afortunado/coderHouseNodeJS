import chatService from '../dao/db/managers/messageManagerMongo.js';


export const getMessage = async (req, res, next) => {
    try {
        await chatService.getMessage();
        res.render("chat", {});
    } catch (error) {
        next(error);
    }
};
 
export const postMessage = async(req, res, next) => {
        const { user, message } = req.body;
        try {
            await chatService.addMessage(user, message);
            res.status(200);
        } catch (error) {
            next(error);
        }
} 


