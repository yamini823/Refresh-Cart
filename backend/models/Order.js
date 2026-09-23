const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(

    {
      items: [
        {
          name: String,
          image: String,
          price: Number,
          quantity: Number,
          productId: String,
        },
      ],

      total: Number,
      paymentMethod: String,
      address: Object,

      status: {
        type: String,
        default:
          "Processing",
      },

      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,

      paymentStatus: {
        type: String,
        enum: ["PENDING_PAYMENT", "PAID", "PAYMENT_FAILED", "CANCELLED"],
        default: "PENDING_PAYMENT"
      }
    },

    {
      timestamps: true,
    }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
);