const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders =
      await Order.find();

    let revenue = 0;

    orders.forEach((order) => {

      revenue += Number(
        order.total || 0
      );

    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      revenue
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching stats"
    });

  }

};

module.exports = {
  getDashboardStats
};