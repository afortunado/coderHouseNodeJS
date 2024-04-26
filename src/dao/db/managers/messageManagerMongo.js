import Messages from "../models/messages.model.js";

const chatService = {};

chatService.addMessage = async (user) => {
    return await Messages.create(user);
};

chatService.getMessage = async() => {
    return await Messages.find();
};


export default chatService; 