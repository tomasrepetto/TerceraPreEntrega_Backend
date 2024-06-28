import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
});

export const ticketModel = mongoose.model('Ticket', ticketSchema);