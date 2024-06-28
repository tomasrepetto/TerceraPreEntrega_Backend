import { getCartsByIdService } from '../dao/cartsMongo.js';

export const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

export const authorize = (roles = []) => {
    return async (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!roles.includes(req.user.rol)) {
            try {
                const carrito = await getCartsByIdService(req.user.cartId);
                if (carrito) {
                    return res.json(carrito);
                } else {
                    return res.status(404).json({ message: 'Cart not found' });
                }
            } catch (error) {
                console.error('Error al obtener el carrito del usuario:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        next();
    };
};
