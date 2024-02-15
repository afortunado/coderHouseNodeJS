import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
});

const Messages = mongoose.model('Messages', MessagesSchema);

export default Messages;