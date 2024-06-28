import { ticketModel } from '../models/ticketModel.js';

export const createTicketService = async (ticketData) => {
    try {
        const newCode = generateUniqueCode(); 
        const ticket = new ticketModel({ ...ticketData, code: newCode });
        console.log('Generated ticket:', ticket); // Log para verificar que el código se genera
        await ticket.save();
        return ticket;
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        throw error;
    }
};

const generateUniqueCode = () => {
    return 'code-' + Date.now(); 
};