import productsDao from '../dao/productsDao.js';

const getProductsServices = async () => {
    return await productsDao.getProductsDao();
};

export default {
    getProductsServices,
};