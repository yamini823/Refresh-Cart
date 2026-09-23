const Address =require("../models/Address");

// ADD ADDRESS

const addAddress =
async (req,res)=>{

  try{

    const address =
    await Address.create(
      req.body
    );

    res.status(201).json(
      address
    );

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Failed"
    });

  }

};

// GET ADDRESSES

const getAddresses =
async (req,res)=>{

  try{

    const {
      email
    } = req.params;

    const addresses =
    await Address.find({
      userEmail: email
    });

    res.json(addresses);

  }catch(error){

    console.log(error);

  }

};

// DELETE

const deleteAddress =
async (req,res)=>{

  try{

    await Address.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:"Deleted"
    });

  }catch(error){

    console.log(error);

  }

};

module.exports = {

  addAddress,

  getAddresses,

  deleteAddress,

};