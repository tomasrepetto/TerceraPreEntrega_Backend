import { Router } from 'express';
import { addProduct, deleteProductsById, getProducts, getProductsById, modificarProducts } from '../dao/DB/productsDB.js';
import { getProductsController } from '../controllers/productsController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductsById);
router.post('/', addProduct);
router.put('/:pid', modificarProducts);
router.delete('/:pid', deleteProductsById);
router.get('/', getProductsController);

export default router;