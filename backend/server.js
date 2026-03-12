const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global error:", err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('Connected to MongoDB successfully'))
    .catch((err)=> console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT}`);
});