import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Asegúrate de que la referencia es correcta
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
    // Otros campos del carrito
});

export const cartModel = mongoose.model('Cart', cartSchema);