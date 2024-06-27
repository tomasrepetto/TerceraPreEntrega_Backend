import { Router } from 'express';
import { authorize } from '../middleware/authMiddleware.js';
import { Ticket } from '../models/ticketModel.js';
import { addProductInCart, createCart, deleteCart, deleteProductsInCart, getCartsById, updateCart, updateProductsInCart } from '../dao/DB/cartsDB.js';
import { cartModel } from '../models/cartsModel.js'; // Importa el modelo Cart correctamente
import { productModel } from '../models/productsModel.js';
import { userModel } from '../models/usersModel.js';

const router = Router();

router.get('/:cid', getCartsById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.delete('/:cid/products/:pid', deleteProductsInCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductsInCart);
router.delete('/:cid', deleteCart);

router.post('/create', async (req, res) => {
    try {
        const { userId, products } = req.body;

        // Verificar si el usuario existe
        const user = await user.findById(userModel);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Crear un nuevo carrito asegurándose de que `productId` está bien estructurado
        const formattedProducts = products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
        }));

        const newCart = new Cart({
            userId,
            products: formattedProducts
        });

        await newCart.save();
        res.status(201).json({ message: 'Cart created successfully', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:cid/purchase', (req, res, next) => {
    console.log('User:', req.user); 
    next();
}, authorize(['user']), async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let amount = 0;
        const productsToUpdate = [];

        for (const item of cart.products) {
            const product = await productModel.findById(item.productId); 

            if (!product) {
                
                productsToUpdate.push(item);
                continue; 
            }

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

        cartModel.products = productsToUpdate;
        await cartModel.save(); 

        res.json({ ticket, unprocessedProducts: productsToUpdate.map(item => item.productId) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;