const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
require("dotenv").config();

// Create Razorpay instance
// It's safe to use dummy keys if ENV is missing during testing, but it will fail the actual payment intent.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* CREATE RAZORPAY ORDER */
router.post("/create-order", async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;
    
    // Amount must be in the smallest currency unit (paise for INR)
    const amountInPaise = Math.round(Number(total) * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save pending order in the database
    const newOrder = new Order({
      items,
      total,
      address,
      paymentMethod,
      status: "Processing",
      paymentStatus: "PENDING_PAYMENT",
      razorpayOrderId: razorpayOrder.id,
    });
    
    await newOrder.save();

    res.json({
      success: true,
      order: razorpayOrder,
      dbOrderId: newOrder._id,
      key_id: process.env.RAZORPAY_KEY_ID // Front-end needs the public key ID to initialize checkout
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
  }
});

/* VERIFY PAYMENT SIGNATURE */
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is legit!
      await Order.findByIdAndUpdate(dbOrderId, {
        paymentStatus: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "Paid" // Aligning with legacy status field if used elsewhere
      });
      
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Signature mismatch
      await Order.findByIdAndUpdate(dbOrderId, {
        paymentStatus: "PAYMENT_FAILED",
      });
      res.status(400).json({ success: false, message: "Invalid Payment Signature" });
    }
  } catch (error) {
    console.error("Razorpay Verify Error:", error);
    res.status(500).json({ message: "Internal Server Error during verification", error: error.message });
  }
});

/* MARK AS CANCELLED IF USER CLOSES POPUP */
router.post("/cancel", async (req, res) => {
  try {
    const { dbOrderId } = req.body;
    await Order.findByIdAndUpdate(dbOrderId, {
      paymentStatus: "CANCELLED",
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
