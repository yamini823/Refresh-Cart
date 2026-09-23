const express =
  require("express");

const router =
  express.Router();

const Order =
  require("../models/Order");

/* GET ORDERS */

router.get(
  "/",
  async (req,res) => {

    try {

      const orders =
        await Order.find()
        .sort({
          createdAt:-1
        });

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message:error.message
      });

    }

});

/* ADD ORDER */

router.post(
  "/",
  async (req,res) => {

    try {

      const order =
        new Order(req.body);

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message:error.message
      });

    }

});

/* UPDATE ORDER STATUS */

router.put(
  "/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* REORDER - Add all order items back to cart */

router.post(
  "/:id/reorder",
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const Cart = require("../models/Cart");
      const mongoose = require("mongoose");

      for (const item of order.items) {
        if (!item.productId) continue;

        let productObjectId;
        try {
          productObjectId = new mongoose.Types.ObjectId(item.productId);
        } catch (e) {
          console.log("Invalid productId:", item.productId);
          continue;
        }

        const existing = await Cart.findOne({ productId: productObjectId });
        if (existing) {
          existing.quantity += item.quantity || 1;
          await existing.save();
        } else {
          const cartItem = new Cart({
            productId: productObjectId,
            quantity: item.quantity || 1,
          });
          await cartItem.save();
        }
      }

      res.json({ message: "Items added to cart successfully" });
    } catch (error) {
      console.log("Reorder error:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;