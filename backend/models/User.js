const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
phone: {
  type: String,
},

address: {
  type: String,
},

profilePic: {
  type: String,
},

city: {
  type: String,
},

pincode: {
  type: String,
},
gender: String,
dob: String,
about: String,

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);