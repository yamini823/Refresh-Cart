const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const {
      email,
      name,
      phone,
      address,
      city,
      pincode,
      profilePic
    } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone,
        address,
        city,
        pincode,
        profilePic
      },
      { new: true }
    );

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update Failed"
    });

  }
};

module.exports = {
  updateProfile
};