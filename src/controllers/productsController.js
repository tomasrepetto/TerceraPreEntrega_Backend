import productsServices from '../services/productsServices.js';

export const getProductsController = async (req, res) => {
    try {
        const products = await productsServices.getProductsServices();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};