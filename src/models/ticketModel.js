import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
}, { timestamps: true });

export const Ticket = mongoose.model('Ticket', ticketSchema);