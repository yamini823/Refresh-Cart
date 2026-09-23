const express = require("express");

const router = express.Router();

const Wishlist =
  require("../models/Wishlist");

/* GET WISHLIST */

router.get("/", async (req, res) => {

  try {

    const items =
      await Wishlist.find()
      .populate("productId");

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/* ADD TO WISHLIST */

router.post("/", async (req, res) => {

  try {

    const exists =
      await Wishlist.findOne({
        productId:
          req.body.productId
      });

    if (exists) {

      return res.json(exists);

    }

    const item =
      new Wishlist({
        productId:
          req.body.productId
      });

    const saved =
      await item.save();

    res.json(saved);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.delete("/:id", async (req, res) => {
  try {
    let deleted = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deleted) {
      deleted = await Wishlist.findOneAndDelete({ productId: req.params.id });
    }
    res.json({
      message: "Removed"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;