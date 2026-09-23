const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


/* =========================
   GET ALL PRODUCTS
========================= */

router.get("/", async (req, res) => {

  try {

    const products =
      await Product.find();

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


/* =========================
   GET PRODUCTS BY CATEGORY
========================= */

router.get("/category/:category", async (req, res) => {

  try {

    const products =
      await Product.find({
        category: req.params.category,
      });

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


/* =========================
   GET SINGLE PRODUCT
========================= */

router.get("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


/* =========================
   ADD PRODUCT
========================= */

router.post("/", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


/* =========================
   UPDATE PRODUCT
========================= */

router.put("/:id", async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


/* =========================
   DELETE PRODUCT
========================= */

router.delete("/:id", async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


module.exports = router;