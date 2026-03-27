const router = require("express").Router();
const Review = require("../models/Review");
const Product = require("../models/Product");

router.get("/product/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "name")
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        
        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        const review = new Review({
            user: userId,
            product: productId,
            rating,
            comment
        });
        await review.save();

        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        await Product.findByIdAndUpdate(productId, {
            rating: avgRating.toFixed(1),
            reviewCount: reviews.length
        });

        const populatedReview = await Review.findById(review._id).populate("user", "name");
        res.json(populatedReview);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        
        const productId = review.product;
        await Review.findByIdAndDelete(req.params.id);

        const reviews = await Review.find({ product: productId });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
            await Product.findByIdAndUpdate(productId, {
                rating: avgRating.toFixed(1),
                reviewCount: reviews.length
            });
        } else {
            await Product.findByIdAndUpdate(productId, {
                rating: 0,
                reviewCount: 0
            });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
