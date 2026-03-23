const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
require("dotenv").config();

const products = [
  { name: "Velvet Matte Lipstick", brand: "Sephora", price: 15, category: "lipstick", image: "https://www.temptalia.com/wp-content/uploads/2023/07/sephora_matte-velvet-lipstick_004_product.jpg", stock: 50, description: "Velvet matte lipstick with long-lasting wear", rating: 4.8, reviewCount: 234, isFeatured: true, colors: [
    { name: "Bright Pink", hex: "#f84672" },
    { name: "Soft Rose Pink", hex: "#aa3a65" },
    { name: "Deep Burgundy", hex: "#5f2a30" },
    { name: "Muted Berry", hex: "#9e2842" },
    { name: "Warm Brick Red", hex: "#702329" }] 
  },
  { name: "Pro Glow Foundation", brand: "Charlotte Tilbury", price: 58, category: "foundation", image: "https://cdn-cjhgk.nitrocdn.com/CXxGixRVyChwAxySbAyltuCiQXRKaWDN/assets/images/optimized/rev-9dad235/www.newbeauty.com/wp-content/uploads/2024/06/charlotte-tilbury-foundation-stick-2.jpg", stock: 35, description: "Glowy foundation with medium coverage and hydration", rating: 4.7, reviewCount: 189, colors: [
    { name: "Fair", hex: "#ecc1a0" },
    { name: "Medium", hex: "#fcb377" },
    { name: "Tan", hex: "#c8794a" },
    { name: "Deep", hex: "#512e28" }] 
  },
  { name: "Hydrating Face Cream", brand: "La Mer", price: 85, category: "skincare", image: "https://www.sephora.com/productimages/product/p416341-av-19-zoom.jpg?imwidth=3000", stock: 28, description: "Luxurious hydrating cream for deep moisture and skin repair", rating: 4.9, reviewCount: 312, sizes: ["15ml", "30ml", "60ml"] },
  { name: "Naked Palette", brand: "Urban Decay", price: 54, category: "eyeshadow", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0kwdJYKMKNF_TLmsiGtIL8djgY0_M9UjM60Ds9RJSRZ2P3vESaw71lMuInv1Vd44ROW6fTLBAEEjxPalhcJPA0Jb1qfgL1CPmrRafaBVERRfczwXzdjYarmNtbz5KkAZ9JHWg4BPYknpQ/s1600/IMG_09512.jpg", stock: 42, description: "12-shade eyeshadow palette with warm desert tones", rating: 4.6, reviewCount: 156, isTrending: true, shadeVariants: [
    { name: "Naked", shades: ["#dbbfbe", "#c19da1", "#c69a8a", "#a27268", "#ac7d6d", "#dba583", "#9f6248", "#69493e", "#b98c87", "#785358", "#32323e", "#46506b"] },
    { name: "Naked 2", shades: ["#eddfd4", "#e8be9b", "#ebd7d6", "#c88e7d", "#cba8ae", "#865a51", "#ac8a88", "#8f807e", "#d8caca", "#d2b2b2", "#6f5159", "#1c1b23"] },
    { name: "Naked 3", shades: ["#e4d3d9", "#d7a9b7", "#cb939d", "#d6a8b5", "#c18496", "#d6a29e", "#b48393", "#b48393", "#a47887", "#b18992", "#795a6a", "#4d3340"] },
    { name: "Smoky", shades: ["#debbb9", "#deaa92", "#976254", "#9d8f9b", "#96a1b8", "#586084", "#444a5f", "#5a4763", "#998497", "#906150", "#dfc7c7", "#e9e0e1"] }
  ]},
  { name: "Lash Sensational - Sky High", brand: "Maybelline", price: 12, category: "mascara", image: "https://images.squarespace-cdn.com/content/v1/5d14e8bfa505890001205e37/1752857301108-WZDCYVZAH2RDS3WQWGVS/avis-maybelline-mascara-sky-high-test-revue-swatches-green-altitude-burgundy-haze-space-diamond-plum-twilight-pauuulette+%287%29.jpg?format=1500w", stock: 100, description: "Volumizing mascara for fanned-out, dramatic lashes", rating: 4.5, reviewCount: 445, colors: [
    { name: "Green Altitude", hex: "#3b4b44" },
    { name: "Burgundy Haze", hex: "#611737" },
    { name: "Space Diamond", hex: "#ceced2" },
    { name: "Plum Twilight", hex: "#3f2b56" }] 
  },
  { name: "Orgasm Blush", brand: "NARS", price: 42, category: "blush", image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg2eju5a2nhm6c", stock: 38, description: "Iconic peachy pink blush for natural flush and glow", rating: 4.8, reviewCount: 267},
  { name: "Diamond Bomb Highlighter", brand: "Fenty Beauty", price: 36, category: "highlighter", image: "https://www.edgars.co.za/cdn/shop/files/DiamondBomb4.jpg?v=1762327007&width=1800", stock: 45, description: "Prismatic highlighter for explosive glow effect", rating: 4.7, reviewCount: 198, colors: [
    { name: "Pink Ice", hex: "#e2dedb" },
    { name: "Lavender Luv'r", hex: "#dfa0c5" },
    { name: "Trophy Wife", hex: "#cca94b" }] 
  },
  { name: "Cheek Pop Blush Stick", brand: "Shiseido", price: 32, category: "blush", image: "https://www.faceandbody.sg/cdn/shop/files/sg-11134207-7rasp-macq9mys708j54.jpg?v=1748522752&width=416", stock: 40, description: "Soft powder blush for a natural rosy cheek look", rating: 4.6, reviewCount: 156, colors: [
    { name: "Romantic", hex: "#9b3833" },
    { name: "First Date", hex: "#cb646b" },
    { name: "Puppy Love", hex: "#e07b7d" },
    { name: "You & I", hex: "#b96254" },
    { name: "Valentine's", hex: "#8f5161" },
    { name: "My Universe", hex: "#a35881" }]
  },
  { name: "Glow Macaron Highlighter", brand: "Becca", price: 38, category: "highlighter", image: "https://i.pinimg.com/736x/62/8f/da/628fda5d8c02b06c743ece9d4eb32563.jpg", stock: 35, description: "Light-catching highlighter for an all-day glow", rating: 4.8, reviewCount: 234, colors: [
    { name: "Opal", hex: "#c7aba0" },
    { name: "Vanilla Quartz", hex: "#eae3dd" },
    { name: "Rose Quartz", hex: "#eec5cb" },
    { name: "Prismatic Amethyst", hex: "#dfd7e6" }
  ]},
  { name: "Blush In Bloom Palette", brand: "Tarte", price: 28, category: "blush", image: "https://i.makeup.fr/2/27/27sowjlu6smx.jpg", stock: 45, description: "Compact blush palette with 3 flattering shades", rating: 4.5, reviewCount: 189},
  { name: "Lite Stix", brand: "ColourPop", price: 16, category: "highlighter", image: "https://www.temptalia.com/wp-content/uploads/2019/05/colour-pop_lite-stix_001_product.jpg", stock: 50, description: "Ultra-fine highlighter for a blinding glow", rating: 4.4, reviewCount: 312, colors: [
    { name: "Urth", hex: "#e8b599" },
    { name: "Star Brite", hex: "#eddfd6" },
    { name: "Flying High", hex: "#e59c9b" },
    { name: "Bullz Eye", hex: "#e6a877" },
    { name: "Acting Up", hex: "#dc7a59" }
  ]},
  { name: "Vitamin C Serum", brand: "The Ordinary", price: 15, category: "skincare", image: "https://www.cultbeauty.com/images?url=https://static.thcdn.com/productimg/original/12243648-9575317605891885.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover", stock: 80, description: "Brightening serum with vitamin C to fade dark spots", rating: 4.6, reviewCount: 523, sizes: ["30ml", "60ml"] },
  { name: "Hydrating Lip Oil", brand: "Dior", price: 38, category: "lipstick", image: "https://imgmediagumlet.lbb.in/media/2025/09/68c13576d755eb1ec0502d1e_1757492598545.jpg", stock: 32, description: "Shiney lip oil with intense hydration and subtle color", rating: 4.9, reviewCount: 145, colors: [
    { name: "Pink", hex: "#f19c9f" },
    { name: "Coral", hex: "#e94e18" },
    { name: "Rasberry", hex: "#ea3d71" },
    { name: "Berry", hex: "#7e065d" }
  ]},
  { name: "Ultra Fine Setting Spray", brand: "Make Up For Ever", price: 32, category: "makeup", image: "https://www.adorebeauty.co.nz/pim_media/000/433/166/MAKE_UP_FOR_EVER_Mist___Fix_Matte_both_sizes.png", stock: 55, description: "Fine mist setting spray for all-day makeup hold", rating: 4.5, reviewCount: 234, sizes: ["30ml", "100ml"] },
  { name: "Hyaluronic Acid Serum", brand: "CeraVe", price: 22, category: "skincare", image: "https://www.cerave.co.uk/-/media/project/loreal/brand-sites/cerave/emea/uk/products/ha-serum/ha-serum-front-lg.jpg?rev=-1?w=500&hash=0735B4BC1C080328DC5EE2473E9B8EF7", stock: 75, description: "Hydrating serum with 3 essential ceramides", rating: 4.7, reviewCount: 412 },
  { name: "Glow Recipe Serum", brand: "Glow Recipe", price: 45, category: "skincare", image: "https://www.cultbeauty.com/images?url=https://static.thcdn.com/productimg/original/15448252-7385174523375984.jpg&format=webp&auto=avif&width=700&height=700&fit=cover&dpr=2", stock: 40, description: "Vitamin C serum with watermelon for radiant skin", rating: 4.8, reviewCount: 289, colors: [
    { name: "Cloudberry Bright", hex: "#fda000" },
    { name: "Plum Plump", hex: "#f35f7b" },
    { name: "Strawberry Smooth", hex: "#cc1819" },
    { name: "Watermelon Glow", hex: "#fe8e9f" }
  ]},
  { name: "Better Than Sex Mascara", brand: "Too Faced", price: 26, category: "mascara", image: "https://secretsglow.ma/wp-content/uploads/2024/12/IMG_3919.png", stock: 60, description: "Volumizing mascara with hourglass-shaped brush", rating: 4.6, reviewCount: 378 },
  { name: "Contour Kit - Matte", brand: "Anastasia Beverly Hills", price: 48, category: "makeup", image: "https://m.media-amazon.com/images/I/51fcS9NXi2L._AC_UF1000,1000_QL80_.jpg", stock: 28, description: "Pro contour palette with 6 shades for sculpted face", rating: 4.7, reviewCount: 198},
  { name: "Cloud Paint Lip Gloss", brand: "Glossier", price: 16, category: "lipstick", image: "https://sidewalkhustle.com/wp-content/uploads/2017/11/glossier-cloud-paint-quad-1.jpg", stock: 90, description: "Cloud-like lip gloss for effortless shine", rating: 4.5, reviewCount: 312, colors: [
    { name: "Bean", hex: "#bc7e6e" },
    { name: "Puff", hex: "#d26e82" },
    { name: "Haze", hex: "#bd5c4d" },
    { name: "Dusk", hex: "#870550" }
  ]},
  { name: "Silk Pillowcase", brand: "Slip", price: 35, category: "other", image: "https://media.self.com/photos/668ebbace307072919298676/4:3/w_4000,h_3000,c_limit/Best%20Silk%20Pillowcases%20062024%20Lede.jpg", stock: 50, description: "Luxury silk pillowcase for hair and skin", rating: 4.8, reviewCount: 167, colors: [
    { name: "Light Blue", hex: "#c9d7e0" },
    { name: "Light Pink", hex: "#dcc1be" },
    { name: "Light Green", hex: "#b6c2a5" }
  ]},
  { name: "Bijoux Brilliance", brand: "Pat McGrath", price: 64, category: "eyeshadow", image: "https://static.thcdn.com/productimg/original/14940282-6135094180608238.jpg", stock: 25, description: "High-end eyeshadow palette with jewel tones", rating: 4.9, reviewCount: 123, shadeVariants: [
    { name: "Jeweled Temptation", shades: ["#d7546d", "#742936", "#8b557e", "#c77150", "#e99f53", "#984d40", "#e6a794", "#752f2d", "#a45d44", "#e57968", "#e35549"] },
    { name: "Starstruck Splendour", shades: ["#fb8378", "#fcb8b4", "#bbc9ab", "#da8d77", "#fbb7b5", "#b95357", "#e0b397", "#ac6e7a", "#586a42", "#b4624c", "#bd7b56"] }
  ]},
  { name: "Double Wear Foundation", brand: "Estée Lauder", price: 52, category: "foundation", image: "https://www.esteelauder.com/media/export/cms/products/640x640/el_prod_141225_640x640_5.jpg", stock: 40, description: "24-hour wear foundation with breathable coverage", rating: 4.7, reviewCount: 234, colors: [
    { name: "Very Light", hex: "#deb388" },
    { name: "Warm Beige", hex: "#d6a67f" },
    { name: "Medium", hex: "#c2885a" },
    { name: "Tan", hex: "#986337" },
    { name: "Deep", hex: "#644032" }
  ]},
  { name: "Rose Gold Palette", brand: "Huda Beauty", price: 58, category: "eyeshadow", image: "https://5.imimg.com/data5/SELLER/Default/2023/12/372962494/YP/DF/FF/28051373/huda-beauty-rose-gold-palette.jpg", stock: 35, description: "Rose gold eyeshadow palette with 9 shades", rating: 4.8, reviewCount: 189, isTrending: true },
  { name: "Retinol Night Cream", brand: "Paula's Choice", price: 68, category: "skincare", image: "https://hrd-live.cdn.scayle.cloud/images/23c903498219fed497765b2b92d5d032.jpg?quality=75", stock: 45, description: "Anti-aging night cream with retinol", rating: 4.6, reviewCount: 267 },
  { name: "Waterproof Eyeliner - Black", brand: "Stila", price: 18, category: "mascara", image: "https://www.stilacosmetics.com/cdn/shop/files/BEST-OF-BEAUTY--ALLURE-2021.jpg?v=1705600717", stock: 70, description: "Waterproof eyeliner for all-day wear", rating: 4.7, reviewCount: 345 },
  { name: "Glow Bronzer ", brand: "Ucanbe", price: 34, category: "makeup", image: "https://m.media-amazon.com/images/I/71yLXpvrDSL._SL1500_.jpg", stock: 55, description: "Sun-kissed glow bronzer for natural look", rating: 4.5, reviewCount: 198, colors: [
    { name: "Light Bronzer", hex: "#d9b1a5" },
    { name: "Bronzer", hex: "#fbb989" },
    { name: "Sunkissed Bronzer", hex: "#da9f77" }
  ]},
  { name: "Glossy Lip Kits Collection", brand: "Kylie Cosmetics", price: 28, category: "lipstick", image: "https://kyliecosmetics.com/cdn/shop/files/v1_Glossy-Lip-Kit_PDP_wwli_2ea193ef-9647-43df-a474-a23c4f3456d5.jpg?crop=center&height=700&v=1750430713&width=756", stock: 65, description: "Glossy lip kit collection for perfect lips", rating: 4.6, reviewCount: 156, colors: [
    { name: "Espresso", hex: "#692f25" },
    { name: "Dolce K", hex: "#a6584e" },
    { name: "Coconut 2.0", hex: "#c26257" },
    { name: "Comes Naturally", hex: "#ce6a62" },
    { name: "Kylie", hex: "#b85f63" },
    { name: "Candy Pink", hex: "#ec2f8d" }
  ]},
  { name: "Acne Control Kit", brand: "Mario Badescu", price: 32, category: "skincare", image: "https://www.mariobadescu.com/cdn/shop/files/shlcbueohwbwgl3gw3g4_eca81f08-744c-4db8-bb35-33e723a61121.jpg?v=1702450332&width=990", stock: 50, description: "Complete acne control kit for clear skin", rating: 4.4, reviewCount: 289 },
  { name: "Volumizing Mascara - Noir Balm", brand: "L'Oréal", price: 24, category: "mascara", image: "https://target.scene7.com/is/image/Target/GUEST_d6dcb955-c4e2-4dbf-b9c7-8800b3cf0958?wid=1200&hei=1200&qlt=80", stock: 85, description: "Volumizing mascara with nourishing balm", rating: 4.5, reviewCount: 456 },
  { name: "Setting Powder - Translucent", brand: "Charlotte Tilbury", price: 38, category: "makeup", image: "https://zwine.ma/cdn/shop/products/AFF-Finish_1.jpg?v=1673549401&width=500", stock: 40, description: "Translucent setting powder for flawless finish", rating: 4.8, reviewCount: 178, colors: [
    { name: "Light", hex: "#f7e2c9" },
    { name: "Medium", hex: "#eec4a3" },
    { name: "Tan", hex: "#eaa36e" },
    { name: "Deep", hex: "#b36b42" }
  ]},
  { name: "Niacinamide Serum 20%", brand: "Paula's Choice", price: 25, category: "skincare", image: "https://www.paulaschoice.com.au/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwdc07a976/images/products/DTC-8030-5TAU-Key-Ingredients.png?sw=1000&sfrm=png", stock: 60, description: "Pore-minimizing serum with niacinamide", rating: 4.7, reviewCount: 367 },
  { name: "Matte Lip Kit ", brand: "Kylie Cosmetics", price: 44, category: "lipstick", image: "https://akns-images.eonline.com/eol_images/Entire_Site/2022816/rs_1027x759-220916140329-1024-ecomm-Kylie-Cosmetics-Lip-Kits.ct.jpg?fit=around%7C1027:759&output-quality=90&crop=1027:759;center,top", stock: 38, description: "Matte lip kit with nude shades", rating: 4.6, reviewCount: 212, colors: [
    { name: "Soft Nude Pink", hex: "#e49e95" },
    { name: "Dusty Rose", hex: "#e2878c" },
    { name: "Classic Kylie Red", hex: "#ed2a36" },
    { name: "Peachy Nude", hex: "#d34d6a" },
    { name: "Caramel Brown Nude", hex: "#b97d62" }
  ]},
  { name: "Pro Brush Set", brand: "Morphe", price: 89, category: "other", image: "https://www.efsbeauty.com/cdn/shop/files/Morphe_RoseGold_TravelSet_PDP_1400x_2x_d6763267-7aab-441e-8199-8f603ac774c2.webp?v=1704911996&width=1946", stock: 30, description: "Professional brush set for flawless makeup", rating: 4.7, reviewCount: 145, isFeatured: true },
  { name: "Eye Cream - Anti Aging", brand: "Olay", price: 55, category: "skincare", image: "https://images.ctfassets.net/su0jtqat2bh5/5xKSiJKcInUx7NFMTAHuK8/412e5ae69b12e2cb4574c68a114b3e45/00075609010781_C1R1_M_NA__1_.png", stock: 45, description: "Anti-aging eye cream for youthful eyes", rating: 4.5, reviewCount: 234 },
  { name: "Brow Gel - Clear", brand: "Glossier", price: 16, category: "mascara", image: "https://glossier-prod.imgix.net/files/glossier-boybrow-brown-09.png?auto=compress,format&cs=srgb&w=1374", stock: 75, description: "Clear brow gel for natural hold", rating: 4.6, reviewCount: 289 },
  { name: "Priming Moisturizer", brand: "Smashbox", price: 42, category: "skincare", image: "https://b1998182.smushcdn.com/1998182/wp-content/uploads/2022/03/Smashbox-Photo-Finish-Primerizer-Primer-7.jpg?lossy=2&strip=1&webp=1", stock: 55, description: "Primer and moisturizer in one", rating: 4.7, reviewCount: 198 },
  { name: "Lip Balm Set - Gift Box", brand: "Fresh", price: 22, category: "lipstick", image: "https://m.media-amazon.com/images/I/61iqt7rdNBL._AC_SL1000_.jpg", stock: 40, description: "Luxury lip balm gift set", rating: 4.8, reviewCount: 167 },
  { name: "Concealer - Full Coverage", brand: "Tarte", price: 28, category: "makeup", image: "https://www.sephora.com/productimages/sku/s2252179-main-zoom.jpg?imwidth=1224", stock: 65, description: "Full coverage concealer for perfect skin", rating: 4.6, reviewCount: 312 },
  { name: "Face Oil - Rose", brand: "Drunk Elephant", price: 38, category: "skincare", image: "https://static.thcdn.com/productimg/original/13317064-1715177668240749.jpg", stock: 35, description: "Rose face oil for radiant glow", rating: 4.7, reviewCount: 145 },
  { name: "Dramatic Lashes Mascara", brand: "Lancôme", price: 20, category: "mascara", image: "https://m.media-amazon.com/images/I/715veZsKWHL._AC_UF1000,1000_QL80_.jpg", stock: 50, description: "Dramatic lashes mascara for bold eyes", rating: 4.8, reviewCount: 234 },
  { name: "The Coffee Shop Palette", brand: "Juvia's Place", price: 52, category: "eyeshadow", image: "https://www.juviasplace.com/cdn/shop/products/IMG_6160_1080x.jpg?v=1689050740", stock: 28, description: "Eyeshadow palette with warm coffee tones", rating: 4.9, reviewCount: 178, isTrending: true },
  { name: "Tinted Moisturizer", brand: "NARS", price: 46, category: "foundation", image: "https://m.media-amazon.com/images/I/71s2RWQrufL._SL1500_.jpg", stock: 45, description: "Lightweight tinted moisturizer for natural look", rating: 4.6, reviewCount: 256 },
  { name: "Sleeping Mask Set", brand: "Laneige", price: 28, category: "skincare", image: "https://m.media-amazon.com/images/I/71GH5Doz3HL._SL1500_.jpg", stock: 50, description: "Overnight sleeping mask for hydrated skin", rating: 4.7, reviewCount: 189 },
  { name: "Bath Bomb Set", brand: "Lush", price: 32, category: "skincare", image: "https://www.lush.com/cdn-cgi/image/width=1920,f=auto/https://unicorn.lush.com/media/thumbnails/products/relax_gift_portrait_hero_2024_38fcc11a_thumbnail_4096.jpg", stock: 40, description: "Relaxing bath bomb gift set", rating: 4.8, reviewCount: 145 },
  { name: "Brush Cleaning Mat", brand: "Sigma", price: 15, category: "other", image: "https://m.media-amazon.com/images/I/81P87NyBiIL.jpg", stock: 80, description: "Effective brush cleaning mat", rating: 4.5, reviewCount: 234 },
  { name: "Makeup Remover Balm", brand: "Banila Co", price: 24, category: "skincare", image: "https://morgenfreude.com/cdn/shop/files/Sdbf6a2df494c4da2bc2ffb79737614a8N.webp?v=1712647216&width=1445", stock: 55, description: "Gentle makeup remover balm", rating: 4.8, reviewCount: 312, colors: [
    { name: "Original", hex: "#eac7d9" },
    { name: "Pore Clarifying", hex: "#cbe6c2" },
    { name: "Revitalizing", hex: "#92cfcd" },
    { name: "Purifying", hex: "#d4d6eb" },
    { name: "Nourishing", hex: "#e2ddaa" }
  ]},
  { name: "Eyelash Curler", brand: "Shu Uemura", price: 22, category: "mascara", image: "https://www.novela.com.sg/asset/ZVkwRjFpRHJzbEhSNEFPRWxCaVZsQjVJT1praDBKR0oySklVSGt0Y1VjWHhadUNsWUhOaWVhWUxPVDNiaFZmdnhXZzRyYjRZSGdUUURZWWFwT24vWjJJZ1RIekZFcTM1R1kxQjNPWGpTZDFGOTJETTNPY0dyREhNaHVVWC9JNGU", stock: 45, description: "Professional eyelash curler for perfect curl", rating: 4.7, reviewCount: 167 },
  { name: "Color Corrector Palette", brand: "NYX", price: 30, category: "makeup", image: "https://cdn.idealo.com/folder/Product/5328/9/5328965/s4_produktbild_max_15/nyx-color-correcting-palette.jpg", stock: 60, description: "Color correcting palette for flawless skin", rating: 4.6, reviewCount: 223, shadeVariants: [
    { name: "Color Correcting Palette", shades: ["#f0c571", "#9accb1", "#ab9cb1", "#dd9b7b", "#d79c7a", "#ae7c4b"] },
    { name: "Deep", shades: ["#e58f54", "#b26b33", "#d58d52", "#703410", "#fbba69", "#c3622b"] },
    { name: "Light", shades: ["#e0a36c", "#e79e69", "#c28954", "#b26f3a", "#f1c16d", "#efa173"] },
    { name: "Medium", shades: ["#e0aa7e", "#e4ae8a", "#dfab7c", "#92664b", "#f2ca96", "#e8a686"] }
  ]},
  { name: "Hair Serum - Argan", brand: "Moroccanoil", price: 26, category: "skincare", image: "https://fr.moroccanoil.com/cdn/shop/products/d1875_digital_brand_mot_ppage_content_resizes_d1752_4_1.jpg?v=1767622870&width=1946", stock: 50, description: "Argan hair serum for silky smooth hair", rating: 4.7, reviewCount: 198 },
  { name: "Body Lotion Set - Beija Flor", brand: "Sol de Janeiro", price: 36, category: "skincare", image: "https://chikshop.ma/wp-content/uploads/2024/06/SOL-DE-JANEIRO-Beija-Flor-Jet-Set-Coffret-Soin-Corps-1.webp", stock: 35, description: "Brazilian body lotion gift set", rating: 4.8, reviewCount: 145 },
  { name: "Mirror - Lighted", brand: "Simplehuman", price: 45, category: "other", image: "https://m.media-amazon.com/images/I/81G2LeSv-9L._AC_UF894,1000_QL80_.jpg", stock: 25, description: "Lighted vanity mirror for perfect makeup", rating: 4.9, reviewCount: 89 },
  { name: "Self Tan Contour Kit", brand: "Bondi Sands", price: 40, category: "skincare", image: "https://static.thcdn.com/productimg/original/14979343-1665172482762556.jpg", stock: 40, description: "Self tanning and contour kit", rating: 4.5, reviewCount: 167 },
  { name: "Compact Powder", brand: "Shiseido", price: 32, category: "makeup", image: "https://www.bigw.com.au/medias/sys_master/images/images/h0f/hff/101994346741790.jpg", stock: 50, description: "Fine compact powder for smooth finish", rating: 4.6, reviewCount: 189 },
  { name: "Body Scrub - Coffee", brand: "Frank Body", price: 28, category: "skincare", image: "https://i5.walmartimages.com/asr/37a303c7-d491-462b-985f-4962894f6bf4.7e719bc76a6e9b4c7ee9409d7a420829.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", stock: 55, description: "Coffee body scrub for smooth skin", rating: 4.7, reviewCount: 234 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    const adminExists = await User.findOne({ email: "admin@makeupshop.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@makeupshop.com",
        password: "admin123",
        isAdmin: true
      });
      console.log("Admin user created: admin@makeupshop.com / admin123");
    }
    
    console.log(`Database seeded with ${products.length} products!`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
