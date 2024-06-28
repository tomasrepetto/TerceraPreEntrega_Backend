export const purchase = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdService(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const ticketData = {
            userId: req.user._id,
            cartId: cart._id,
        };

        console.log('Ticket data before creation:', ticketData);

        const ticket = await createTicketService(ticketData);
        res.status(201).json({ message: 'Purchase successful', ticket });
    } catch (error) {
        console.error('Error during purchase:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};