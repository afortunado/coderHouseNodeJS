import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Messages = mongoose.model('Messages', MessagesSchema);

export default Messages;