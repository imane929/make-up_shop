const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { cloudinaryConnect } = require("../config/cloudinary");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Get all products
router.get("/", async(req,res)=>{
    try{
        const {category,minPrice,maxPrice} = req.query;

        let filter = {};

        if(category) filter.category = category;

        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte = parseFloat(minPrice);
            if(maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const products = await Product.find(filter);

        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get product by id
router.get("/:id", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message  });
    }
});

// Create a new product
router.post("/", async(req, res) => {
    try {
        const { name, brand, price, category, image, stock, description, rating, reviewCount, isFeatured, isTrending, colors, sizes } = req.body;
        
        const newProduct = new Product({
            name,
            brand,
            price,
            category,
            image,
            stock,
            description,
            rating,
            reviewCount,
            isFeatured,
            isTrending,
            colors,
            sizes
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update a product
router.put("/:id", async(req, res) => {
    try {
        const { name, brand, price, category, image, stock, description, rating, reviewCount, isFeatured, isTrending, colors, sizes } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, brand, price, category, image, stock, description, rating, reviewCount, isFeatured, isTrending, colors, sizes },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Delete a product
router.delete("/:id", async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Upload image to cloudinary
router.post("/upload", upload.single("image"), async(req,res)=>{

const result = await cloudinary.uploader.upload(req.file.path)

res.json({url:result.secure_url})

})

module.exports = router;