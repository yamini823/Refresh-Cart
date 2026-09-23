const mongoose =
  require("mongoose");

const wishlistSchema =
  new mongoose.Schema({

    productId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Product"

    }

  },

  {

    timestamps: true

  }

);

module.exports =
  mongoose.model(
    "Wishlist",
    wishlistSchema
  );