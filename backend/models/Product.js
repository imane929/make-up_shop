const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { 
        type: String, 
        required: true,
        enum: ['lipstick', 'foundation', 'eyeshadow', 'skincare', 'mascara', 'blush', 'highlighter', 'makeup', 'other']
    },
    image: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);

