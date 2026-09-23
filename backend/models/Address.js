const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
{
  userEmail: String,

  fullName: String,

  phone: String,

  address: String,

  city: String,

  pincode: String,

  label: String, // Home, Work, Hostel
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model(
  "Address",
  addressSchema
);