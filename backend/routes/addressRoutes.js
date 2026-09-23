const express =
require("express");

const router =
express.Router();

const {

  addAddress,

  getAddresses,

  deleteAddress,

} = require(
 "../controllers/addressController"
);

router.post(
  "/add",
  addAddress
);

router.get(
  "/:email",
  getAddresses
);

router.delete(
  "/:id",
  deleteAddress
);

module.exports =
router;