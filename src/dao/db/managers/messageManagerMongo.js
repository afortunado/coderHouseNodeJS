import Messages from "../models/messages.model.js";

const chatService = {};

chatService.addMessage = async (msg) => {
    return await Messages.create(msg);
};

chatService.getMessage = async() => {
    return await Messages.find();
};


export default chatService; 