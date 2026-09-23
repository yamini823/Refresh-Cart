const express = require("express");

const router = express.Router();

const Cart =
  require("../models/Cart");

/* GET CART */

router.get("/", async (req, res) => {

  try {

    const items =
      await Cart.find()
      .populate("productId");

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/* ADD TO CART */

router.post("/", async (req, res) => {

  try {

    console.log(req.body);

    const {
      productId,
      quantity
    } = req.body;

    const existing =
      await Cart.findOne({
        productId
      });

    if (existing) {

      existing.quantity += 1;

      await existing.save();

      return res.json(existing);

    }

    const item =
      new Cart({

        productId,

        quantity

      });

    const saved =
      await item.save();

    res.json(saved);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

/* UPDATE QUANTITY */

router.put("/:id", async (req, res) => {

  try {

    const item =
      await Cart.findByIdAndUpdate(

        req.params.id,

        {
          quantity:
            req.body.quantity
        },

        { new: true }

      );

    res.json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/* CLEAR CART */
router.delete("/clear", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE ITEM */

router.delete("/:id", async (req, res) => {

  try {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;