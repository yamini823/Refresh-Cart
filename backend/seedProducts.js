// seedProducts.js - inserts 38 curated, high-quality grocery items into MongoDB
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI;

async function connect() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');
}

const initialProducts = [
  // FRUITS
  {
    name: "Organic Red Gala Apples (1kg)",
    brand: "Nature's Best",
    category: "Fruits",
    price: 180,
    oldPrice: 220,
    rating: "4.8",
    offer: "18% OFF",
    stock: 120,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600",
    description: "Crisp, sweet, and juicy organic red Gala apples sourced directly from hill orchards."
  },
  {
    name: "Fresh Yellow Bananas (1 Dozen)",
    brand: "Farm Fresh",
    category: "Fruits",
    price: 60,
    oldPrice: 80,
    rating: "4.7",
    offer: "25% OFF",
    stock: 200,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
    description: "Naturally ripened, rich in potassium yellow bananas ideal for daily nutrition."
  },
  {
    name: "Sweet Red Strawberries (250g)",
    brand: "Berry Fresh",
    category: "Fruits",
    price: 149,
    oldPrice: 199,
    rating: "4.9",
    offer: "25% OFF",
    stock: 75,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600",
    description: "Plump and juicy farm-picked red strawberries packed with vitamin C."
  },
  {
    name: "Juicy Nagpur Oranges (1kg)",
    brand: "SunCitrus",
    category: "Fruits",
    price: 120,
    oldPrice: 150,
    rating: "4.6",
    offer: "20% OFF",
    stock: 150,
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=600",
    description: "Tangy and sweet juicy oranges packed with vitamin C."
  },
  {
    name: "Royal Alphonso Mangoes (1kg)",
    brand: "King Orchards",
    category: "Fruits",
    price: 499,
    oldPrice: 650,
    rating: "5.0",
    offer: "23% OFF",
    stock: 60,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
    description: "Aromatic and sweet naturally ripened Alphonso mangoes."
  },
  {
    name: "Organic Hass Avocados (2 Pcs)",
    brand: "Green Gold",
    category: "Fruits",
    price: 199,
    oldPrice: 299,
    rating: "4.5",
    offer: "33% OFF",
    stock: 90,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
    description: "Creamy, rich Hass avocados perfect for toast, guacamole, and salads."
  },
  {
    name: "Seedless Green Grapes (500g)",
    brand: "Nature's Best",
    category: "Fruits",
    price: 110,
    oldPrice: 140,
    rating: "4.6",
    offer: "21% OFF",
    stock: 110,
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=600",
    description: "Sweet, crunchy seedless green grapes washed and ready to snack."
  },
  {
    name: "Fresh Sweet Watermelon (1 Pc)",
    brand: "Farm Fresh",
    category: "Fruits",
    price: 150,
    oldPrice: 200,
    rating: "4.7",
    offer: "25% OFF",
    stock: 45,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    description: "Hydrating, sweet red watermelon perfect for hot summer days."
  },

  // VEGETABLES
  {
    name: "Fresh Farm Spinach (Bunch)",
    brand: "GreenLeaf",
    category: "Vegetables",
    price: 35,
    oldPrice: 50,
    rating: "4.7",
    offer: "30% OFF",
    stock: 140,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
    description: "Nutritious dark green iron-rich fresh spinach leaves."
  },
  {
    name: "Red Farm Tomatoes (1kg)",
    brand: "Farm Fresh",
    category: "Vegetables",
    price: 45,
    oldPrice: 60,
    rating: "4.5",
    offer: "25% OFF",
    stock: 180,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
    description: "Firm, juicy red farm tomatoes great for curries and salads."
  },
  {
    name: "Crunchy Orange Carrots (1kg)",
    brand: "GreenLeaf",
    category: "Vegetables",
    price: 55,
    oldPrice: 75,
    rating: "4.6",
    offer: "26% OFF",
    stock: 130,
    image: "https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&q=80&w=600",
    description: "Sweet and crunchy orange carrots rich in Beta-carotene."
  },
  {
    name: "Organic Broccoli Florets (500g)",
    brand: "NaturePure",
    category: "Vegetables",
    price: 85,
    oldPrice: 110,
    rating: "4.8",
    offer: "22% OFF",
    stock: 80,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=600",
    description: "Fresh green broccoli heads packed with antioxidants and fiber."
  },
  {
    name: "Fresh Idaho Potatoes (1kg)",
    brand: "Farm Fresh",
    category: "Vegetables",
    price: 40,
    oldPrice: 55,
    rating: "4.4",
    offer: "27% OFF",
    stock: 250,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600",
    description: "Versatile starchy potatoes perfect for baking, mashing, or frying."
  },
  {
    name: "Red Onions (1kg)",
    brand: "Farm Fresh",
    category: "Vegetables",
    price: 50,
    oldPrice: 65,
    rating: "4.5",
    offer: "23% OFF",
    stock: 220,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600",
    description: "Flavorful red onions essential for every kitchen recipe."
  },
  {
    name: "Tri-Color Bell Peppers (3 Pcs)",
    brand: "GreenLeaf",
    category: "Vegetables",
    price: 99,
    oldPrice: 130,
    rating: "4.7",
    offer: "23% OFF",
    stock: 95,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=600",
    description: "Vibrant red, yellow, and green bell peppers for stir-fries and salads."
  },

  // DAIRY
  {
    name: "Pure Whole Milk (1L Bottle)",
    brand: "DairyDelight",
    category: "Dairy",
    price: 68,
    oldPrice: 80,
    rating: "4.9",
    offer: "15% OFF",
    stock: 160,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
    description: "Pasteurized, farm-fresh whole cow milk packed with calcium and protein."
  },
  {
    name: "Sharp Cheddar Cheese Block (200g)",
    brand: "DairyDelight",
    category: "Dairy",
    price: 240,
    oldPrice: 290,
    rating: "4.8",
    offer: "17% OFF",
    stock: 85,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600",
    description: "Aged natural cheddar cheese with a rich, bold flavor."
  },
  {
    name: "Creamy Greek Yogurt (400g)",
    brand: "DairyDelight",
    category: "Dairy",
    price: 135,
    oldPrice: 160,
    rating: "4.7",
    offer: "15% OFF",
    stock: 100,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
    description: "Thick, high-protein probiotic Greek yogurt with no added sugar."
  },
  {
    name: "Salted Country Butter (200g)",
    brand: "Amul",
    category: "Dairy",
    price: 115,
    oldPrice: 130,
    rating: "4.9",
    offer: "11% OFF",
    stock: 140,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600",
    description: "Rich, creamy salted butter made from pure cow milk cream."
  },
  {
    name: "Fresh Cottage Cheese Paneer (200g)",
    brand: "DairyDelight",
    category: "Dairy",
    price: 105,
    oldPrice: 125,
    rating: "4.8",
    offer: "16% OFF",
    stock: 110,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600",
    description: "Soft and fresh paneer blocks ideal for tikka, curries, and grilling."
  },
  {
    name: "Organic Free-Range Eggs (12 Pack)",
    brand: "Farm Fresh",
    category: "Dairy",
    price: 110,
    oldPrice: 135,
    rating: "4.8",
    offer: "18% OFF",
    stock: 150,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600",
    description: "Nutritious brown free-range eggs sourced from local cruelty-free farms."
  },

  // BAKERY
  {
    name: "Artisan Sourdough Loaf",
    brand: "Baker’s Choice",
    category: "Bakery",
    price: 180,
    oldPrice: 220,
    rating: "4.9",
    offer: "18% OFF",
    stock: 60,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    description: "Crusty, slow-fermented artisan sourdough bread baked fresh daily."
  },
  {
    name: "Flaky Butter Croissants (4 Pack)",
    brand: "Baker’s Choice",
    category: "Bakery",
    price: 199,
    oldPrice: 250,
    rating: "4.8",
    offer: "20% OFF",
    stock: 50,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600",
    description: "Golden, buttery, multi-layered French croissants."
  },
  {
    name: "Chocolate Chip Cookies (12 Pack)",
    brand: "Baker’s Choice",
    category: "Bakery",
    price: 160,
    oldPrice: 200,
    rating: "4.7",
    offer: "20% OFF",
    stock: 75,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600",
    description: "Freshly baked soft-centered cookies loaded with real chocolate chips."
  },
  {
    name: "Healthy Whole Wheat Bread",
    brand: "Britannia",
    category: "Bakery",
    price: 55,
    oldPrice: 70,
    rating: "4.5",
    offer: "21% OFF",
    stock: 120,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600",
    description: "100% whole grain wheat bread packed with dietary fiber."
  },

  // SNACKS
  {
    name: "Classic Salted Potato Chips (150g)",
    brand: "SnackZone",
    category: "Snacks",
    price: 60,
    oldPrice: 75,
    rating: "4.6",
    offer: "20% OFF",
    stock: 190,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=600",
    description: "Thin, crispy golden potato slices seasoned with sea salt."
  },
  {
    name: "70% Dark Cocoa Chocolate Bar (100g)",
    brand: "ChocoLuxe",
    category: "Snacks",
    price: 180,
    oldPrice: 220,
    rating: "4.9",
    offer: "18% OFF",
    stock: 110,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600",
    description: "Rich and smooth premium dark chocolate made from single-origin cocoa."
  },
  {
    name: "Roasted Salted Almonds (250g)",
    brand: "NuttyDelight",
    category: "Snacks",
    price: 320,
    oldPrice: 400,
    rating: "4.8",
    offer: "20% OFF",
    stock: 95,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    description: "Crunchy oven-roasted California almonds lightly seasoned with salt."
  },
  {
    name: "Butter Theater Popcorn (100g)",
    brand: "SnackZone",
    category: "Snacks",
    price: 75,
    oldPrice: 95,
    rating: "4.5",
    offer: "21% OFF",
    stock: 130,
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&q=80&w=600",
    description: "Fluffy popped corn coated with rich golden butter."
  },

  // BEVERAGES
  {
    name: "100% Pure Cold-Pressed Orange Juice (1L)",
    brand: "Sunrise",
    category: "Beverages",
    price: 160,
    oldPrice: 200,
    rating: "4.8",
    offer: "20% OFF",
    stock: 110,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600",
    description: "Freshly squeezed natural orange juice with pulp and no added sugar."
  },
  {
    name: "Organic Japanese Matcha Green Tea (100g)",
    brand: "ZenBrew",
    category: "Beverages",
    price: 450,
    oldPrice: 550,
    rating: "4.9",
    offer: "18% OFF",
    stock: 70,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=600",
    description: "Premium ceremonial grade green tea powder rich in antioxidants."
  },
  {
    name: "Artisanal Cold Brew Coffee (500ml)",
    brand: "ZenBrew",
    category: "Beverages",
    price: 180,
    oldPrice: 220,
    rating: "4.7",
    offer: "18% OFF",
    stock: 85,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    description: "Steeped for 18 hours, smooth and low-acid arabica cold brew."
  },
  {
    name: "Sparkling Lime Mineral Water (1L)",
    brand: "Sunrise",
    category: "Beverages",
    price: 90,
    oldPrice: 110,
    rating: "4.6",
    offer: "18% OFF",
    stock: 140,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    description: "Crisp sparkling water infused with natural lime flavor."
  },

  // HOUSEHOLD
  {
    name: "Lemon Fresh Dishwashing Gel (750ml)",
    brand: "CleanHome",
    category: "Household",
    price: 140,
    oldPrice: 175,
    rating: "4.6",
    offer: "20% OFF",
    stock: 120,
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&q=80&w=600",
    description: "Tough on grease, gentle on hands liquid dishwashing cleaner."
  },
  {
    name: "Ocean Breeze Laundry Detergent (2L)",
    brand: "CleanHome",
    category: "Household",
    price: 399,
    oldPrice: 499,
    rating: "4.8",
    offer: "20% OFF",
    stock: 90,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600",
    description: "Deep-cleaning liquid detergent with long-lasting fresh scent."
  },
  {
    name: "Kitchen Paper Towels (4 Rolls)",
    brand: "CleanHome",
    category: "Household",
    price: 180,
    oldPrice: 220,
    rating: "4.7",
    offer: "18% OFF",
    stock: 100,
    image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600",
    description: "Highly absorbent 2-ply kitchen paper towels for easy cleanups."
  },

  // MEAT & SEAFOOD
  {
    name: "Boneless Fresh Chicken Breast (500g)",
    brand: "Premium Meats",
    category: "Meat & Seafood",
    price: 260,
    oldPrice: 320,
    rating: "4.8",
    offer: "18% OFF",
    stock: 80,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600",
    description: "Antibiotic-free tender boneless chicken breast cuts."
  },
  {
    name: "Norwegian Salmon Fillet (300g)",
    brand: "Premium Meats",
    category: "Meat & Seafood",
    price: 699,
    oldPrice: 850,
    rating: "4.9",
    offer: "18% OFF",
    stock: 40,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    description: "Rich in Omega-3, fresh skin-on Norwegian salmon fillet."
  },

  // PANTRY STAPLES
  {
    name: "Royal Long Grain Basmati Rice (5kg)",
    brand: "Nature's Best",
    category: "Pantry Staples",
    price: 650,
    oldPrice: 800,
    rating: "4.9",
    offer: "18% OFF",
    stock: 100,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    description: "Aged long grain aromatic Basmati rice perfect for biryani and pulao."
  },
  {
    name: "Extra Virgin Cold-Pressed Olive Oil (1L)",
    brand: "Nature's Best",
    category: "Pantry Staples",
    price: 799,
    oldPrice: 999,
    rating: "4.9",
    offer: "20% OFF",
    stock: 70,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
    description: "100% pure cold-pressed Spanish olive oil for salad dressings and cooking."
  }
];

async function seed() {
  try {
    await connect();
    await Product.deleteMany();
    await Product.insertMany(initialProducts);
    console.log(`✅ Inserted ${initialProducts.length} products with matching high-quality images`);
  } catch (err) {
    console.error('❌ Seeding error', err);
  } finally {
    mongoose.disconnect();
  }
if (require.main === module) {
  seed();
}

module.exports = initialProducts;
