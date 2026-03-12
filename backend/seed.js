const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  {
    name: "Velvet Matte Lipstick - Ruby Rose",
    brand: "Sephora Collection",
    price: 24,
    category: "lipstick",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
    stock: 50,
    description: "Long-lasting matte lipstick with vibrant colors and creamy texture",
    rating: 4.5,
    reviewCount: 120,
    isFeatured: true
  },
  {
    name: "Pro Glow Foundation - Sand",
    brand: "Charlotte Tilbury",
    price: 58,
    category: "foundation",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    stock: 30,
    description: "Medium coverage foundation with radiant finish for flawless skin",
    rating: 4.8,
    reviewCount: 200,
    isFeatured: true
  },
  {
    name: "Naked Palette - Desert Sunset",
    brand: "Urban Decay",
    price: 54,
    category: "eyeshadow",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
    stock: 25,
    description: "12-color eyeshadow palette with shimmery and matte shades",
    rating: 4.7,
    reviewCount: 85,
    isTrending: true
  },
  {
    name: "Moisturizing Face Cream",
    brand: "La Mer",
    price: 85,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&q=80",
    stock: 100,
    description: "Luxurious moisturizing cream with Miracle Broth formula",
    rating: 4.9,
    reviewCount: 350,
    isFeatured: true
  },
  {
    name: "Lash Sensational Mascara",
    brand: "Maybelline",
    price: 12,
    category: "mascara",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&q=80",
    stock: 80,
    description: "Volumizing mascara for dramatic, fanned-out lashes",
    rating: 4.4,
    reviewCount: 180
  },
  {
    name: "Orgasm Blush - Peachy Pink",
    brand: "NARS",
    price: 42,
    category: "blush",
    image: "https://www.amazon.com/NARS-Orgasm-Peachy-Golden-Shimmer/dp/B0BPD9HC2P",
    stock: 40,
    description: "Iconic silky powder blush for natural flush and glow",
    rating: 4.6,
    reviewCount: 95
  },
  {
    name: "Diamond Bomb Highlighter",
    brand: "Fenty Beauty",
    price: 36,
    category: "highlighter",
    image: "https://images.unsplash.com/photo-1560891958-68bb1b0e49f6?w=600&q=80",
    stock: 35,
    description: "High-impact highlighter with diamond-like shimmer",
    rating: 4.8,
    reviewCount: 220,
    isTrending: true
  },
  {
    name: "Vitamin C Serum",
    brand: "The Ordinary",
    price: 15,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    stock: 60,
    description: "Antioxidant vitamin C serum for bright and even skin tone",
    rating: 4.7,
    reviewCount: 400
  },
  {
    name: "Hydrating Lip Oil - Cherry",
    brand: "Dior",
    price: 38,
    category: "lipstick",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231658?w=600&q=80",
    stock: 45,
    description: "Glossy lip oil with intense hydration and subtle color",
    rating: 4.9,
    reviewCount: 180,
    isFeatured: true
  },
  {
    name: "Setting Spray - Ultra Fine",
    brand: "Make Up For Ever",
    price: 32,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1631214540553-ab2016c02404?w=600&q=80",
    stock: 70,
    description: "Micro-fine mist for all-day makeup locking",
    rating: 4.5,
    reviewCount: 150
  },
  {
    name: "Double Wear Foundation",
    brand: "Estée Lauder",
    price: 44,
    category: "foundation",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80",
    stock: 25,
    description: "24-hour wear foundation with breathable coverage",
    rating: 4.7,
    reviewCount: 300
  },
  {
    name: "Hyaluronic Acid Serum",
    brand: "CeraVe",
    price: 22,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=600&q=80",
    stock: 90,
    description: "Hydrating serum with 3 essential ceramides",
    rating: 4.8,
    reviewCount: 450,
    isTrending: true
  },
  {
    name: "Better Than Sex Mascara",
    brand: "Too Faced",
    price: 26,
    category: "mascara",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80",
    stock: 55,
    description: "Volumizing mascara with hourglass-shaped brush",
    rating: 4.3,
    reviewCount: 220
  },
  {
    name: "Glow Recipe Serum",
    brand: "Glow Recipe",
    price: 45,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
    stock: 40,
    description: "Vitamin C serum with watermelon for radiant skin",
    rating: 4.6,
    reviewCount: 280
  },
  {
    name: "Contour Kit - Matte",
    brand: "Anastasia Beverly Hills",
    price: 48,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    stock: 35,
    description: "Pro contour palette with 6 shades for sculpted face",
    rating: 4.5,
    reviewCount: 190,
    isTrending: true
  },
  {
    name: "Lip Gloss - Clear",
    brand: "Glossier",
    price: 16,
    category: "lipstick",
    image: "https://images.unsplash.com/photo-1570130937306-5b1c4d53c4c0?w=600&q=80",
    stock: 80,
    description: "Cloud-like lip gloss for effortless shine",
    rating: 4.4,
    reviewCount: 310
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/makeupshop");
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    // Create admin user if not exists
    const adminExists = await User.findOne({ email: "admin@makeupshop.com" });
    if (!adminExists) {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@makeupshop.com",
        password: hashedPassword,
        isAdmin: true
      });
      console.log("Admin user created: admin@makeupshop.com / admin123");
    }
    
    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

