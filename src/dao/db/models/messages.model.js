import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
});

const Messages = mongoose.model('Messages', MessagesSchema);

export default Messages;