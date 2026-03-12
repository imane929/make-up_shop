const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [{ productId: String, quantity: Number}],
    total: { type: Number, required: true},
    status: { type: String, required: true, default: 'pending'},
    address: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema)
