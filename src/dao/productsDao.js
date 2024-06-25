import { productModel } from '../models/productsModel.js';

const getProductsDao = async () => {
    return await productModel.find();
};

export default {
    getProductsDao,
};