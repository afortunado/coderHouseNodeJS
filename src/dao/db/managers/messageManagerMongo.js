import Messages from "../models/messages.model.js";

const chatService = {};
 
chatService.getMessage = async() => { 
    return await Messages.find();
};
 
chatService.addMessage = async (user, msg) => {
    return Messages.create({ user, msg });
};

export default chatService; 