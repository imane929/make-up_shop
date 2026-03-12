const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://localhost:27017/makeupshop");

const staticProducts = [
  {
    name:"Velvet Matte Lipstick - Ruby Rose",
    category:"lipstick",
    price:24,
    image:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
    brand:"Sephora",
    rating:4.8,
    reviewCount:234,
    stock:50,
    description:"Velvet matte lipstick in Ruby Rose shade with long-lasting wear.",
    isFeatured:true
  },
  {
    name:"Pro Glow Foundation - Sand",
    category:"foundation",
    price:58,
    image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    brand:"Fenty Beauty",
    rating:4.7,
    reviewCount:189,
    stock:35,
    description:"Glowy foundation in Sand shade with medium coverage and hydration."
  },
  {
    name:"Hydrating Face Cream",
    category:"skincare",
    price:85,
    image:"https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&q=80",
    brand:"La Mer",
    rating:4.9,
    reviewCount:312,
    stock:28,
    description:"Luxurious hydrating cream for deep moisture and skin repair."
  },
  {
    name:"Naked Palette - Desert Sunset",
    category:"eyeshadow",
    price:54,
    image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
    brand:"Urban Decay",
    rating:4.6,
    reviewCount:156,
    stock:42,
    isTrending:true,
    description:"12-shade eyeshadow palette with warm desert tones."
  },
  {
    name:"Lash Sensational Mascara",
    category:"mascara",
    price:12,
    image:"https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&q=80",
    brand:"Maybelline",
    rating:4.5,
    reviewCount:445,
    stock:100,
    description:"Volumizing mascara for fanned-out, dramatic lashes."
  },
  {
    name:"Orgasm Blush - Peachy Pink",
    category:"blush",
    price:42,
    image:"https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80",
    brand:"NARS",
    rating:4.8,
    reviewCount:267,
    stock:38,
    description:"Iconic peachy pink blush for natural flush and glow."
  },
  {
    name:"Diamond Bomb Highlighter",
    category:"highlighter",
    price:36,
    image:"https://images.unsplash.com/photo-1560891958-68bb1b0e49f6?w=600&q=80",
    brand:"Fenty Beauty",
    rating:4.7,
    reviewCount:198,
    stock:45,
    description:"Prismatic highlighter for explosive glow effect."
  },
  {
    name:"Vitamin C Serum",
    category:"skincare",
    price:15,
    image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    brand:"The Ordinary",
    rating:4.6,
    reviewCount:523,
    stock:80,
    description:"Brightening serum with vitamin C to fade dark spots."
  },
  {
    name:"Hydrating Lip Oil - Cherry",
    category:"lipstick",
    price:38,
    image:"https://images.unsplash.com/photo-1585386959984-a41552231658?w=600&q=80",
    brand:"Dior",
    rating:4.9,
    reviewCount:145,
    stock:32,
    description:"Shiney lip oil with cherry tint and intense hydration."
  },
  {
    name:"Ultra Fine Setting Spray",
    category:"makeup",
    price:32,
    image:"https://images.unsplash.com/photo-1631214540553-ab2016c02404?w=600&q=80",
    brand:"Urban Decay",
    rating:4.5,
    reviewCount:234,
    stock:55,
    description:"Fine mist setting spray for all-day makeup hold."
  }
  // Continue with all 50...
  // [abbreviated for length, full data mapped similarly]
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    for (let p of staticProducts) {
      const prod = new Product(p);
      await prod.save();
    }
    console.log(`Database seeded with ${staticProducts.length} products!`);
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
