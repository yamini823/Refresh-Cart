const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: String,
  category: String,
  brand: String,

  price: Number,
  oldPrice: Number,

  rating: Number,

  offer: String,

  description: String,

  image: String,

  stock: {
    type: Number,
    default: 100
  }

});

module.exports =
mongoose.model(
  "Product",
  productSchema
);