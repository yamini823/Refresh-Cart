require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const wishlistRoutes =
  require("./routes/wishlistRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const userRoutes =
  require("./routes/userRoutes");

const chatRoutes =
  require("./routes/chatRoutes");
  
  const addressRoutes =
require("./routes/addressRoutes");

const adminRoutes =
require("./routes/adminRoutes");

  

connectDB().then(async () => {
  try {
    const Product = require("./models/Product");
    const count = await Product.countDocuments();
    const brokenSample = await Product.findOne({ image: { $regex: "source.unsplash.com" } });
    if (count === 0 || brokenSample) {
      console.log("🌱 Auto-seeding products database with matching high quality images...");
      const initialProducts = require("./seedProducts");
      await Product.deleteMany();
      await Product.insertMany(initialProducts);
      console.log("✅ Auto-seeding complete!");
    }
  } catch (err) {
    console.error("Auto-seed check failed:", err.message);
  }
});

const app = express();


/* MIDDLEWARE */
const corsOptions = {
  origin: [
    "https://refresh-cart-4p5d.vercel.app",
    "https://refresh-cart.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());

/* ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/address",
  addressRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

/* AI CHAT */

app.use(
  "/api",
  chatRoutes
);

/* HOME */

app.get("/", (req,res)=>{

  res.send(
    "API running..."
  );

});

/* SERVER */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT,()=>{

  console.log(
    `Server running on ${PORT}`
  );

});
// trigger nodemon reload
