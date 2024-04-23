import mongoose from "mongoose";
 
const TicketSchema = new mongoose.Schema({
    code: {
         type: String,
         unique: true,
         required: true
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        unique: true,
        required: true
    }
})

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;