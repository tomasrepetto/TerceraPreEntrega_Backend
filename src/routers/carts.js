import { Router } from 'express';
import { authorize } from '../middleware/authMiddleware.js';
import { Ticket } from '../models/ticketModel.js';
import { addProductInCart, createCart, deleteCart, deleteProductsInCart, getCartsById, updateCart, updateProductsInCart } from '../dao/DB/cartsDB.js';


const router = Router();

router.get('/:cid', getCartsById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.delete('/:cid/products/:pid', deleteProductsInCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductsInCart);
router.delete('/:cid', deleteCart);

router.post('/:cid/purchase', authorize(['user']), async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartsByIdService(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let amount = 0;
        const productsToUpdate = [];

        for (const item of cart.products) {
            const product = await productModel.findById(item.id);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                amount += product.price * item.quantity;
                await product.save();
            } else {
                productsToUpdate.push(item);
            }
        }

        const ticket = await Ticket.create({
            amount,
            purchaser: req.user.email
        });

        cart.products = productsToUpdate;
        await cart.save();

        res.json({ ticket, unprocessedProducts: productsToUpdate.map(item => item.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;