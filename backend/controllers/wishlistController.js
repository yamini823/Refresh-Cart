const Wishlist = require("../models/Wishlist");

const addWishlist = async (req, res) => {

  try {

    const wishlist =
      await Wishlist.create(req.body);

    res.status(201).json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getWishlist = async (req, res) => {

  try {

    const wishlist =
      await Wishlist.find();

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addWishlist,
  getWishlist,
};