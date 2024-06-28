import { createTicketService } from '../services/ticketService.js';

export const createTicket = async (req, res) => {
    try {
        const ticket = await createTicketService(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el ticket', error: error.message });
    }
};