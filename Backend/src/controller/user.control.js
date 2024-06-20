const userModel = require('../model/usertrack.model')
const jwt = require('jsonwebtoken')
const { isValidEmail, isValidMobile } = require('../validations/valid')

const createUser = async function (req, res) {
  try {
    let user = req.body
    const { name, email, mobile, componentname, quantity, issuedAt, returnDate, status } = user;

    //checking for required fields
    if (!name) { return res.status(400).send({ status: false, message: "user name is required" }) }

    if (!email) { return res.status(400).send({ status: false, message: "email is required" }) }
    if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Invalid Email" }) }

    if (!mobile) { return res.status(400).send({ status: false, message: "mobile is required" }) }
    if (!isValidMobile(mobile)) { return res.status(400).send({ status: false, message: "Enter the valid mobile" }) }

    if (!["inactive", "active", "pending", "returned"].includes(status)) {
      return res.status(400).send({ status: false, message: "Status must be one of 'inactive', 'active', 'pending', 'returned'" });
    }

    //checking for unique mail
    const uniqueMail = await userModel.findOne({ email: email });
    if (uniqueMail) return res.status(400).send({ status: false, message: "this email already exist" });

    let userCreated = await userModel.create(user)
    return res.status(201).send({ status: true, msg: "User Created Successfully", data: userCreated })
  }

  catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}
//==================CRUD METHODS================================
//================/GET METHOD/==================================

const getUser = async function (req, res) {
  try {
    const user = await userModel.find()
    res.status(200).send({ status: true, msg: "User Data", data: user });
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ status: false, error: 'Internal Server Error' });
  }
};
// Retrieve a single product by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ status: false, message: "User not found" });
    return res.status(200).send({ status: true, data: user });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Update
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedDetail = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );
    if (!updatedDetail)
      return res
        .status(404)
        .send({ status: false, message: "User not registered" });
    return res
      .status(200)
      .send({
        status: true,
        message: "User details updated successfully",
        data: updatedDetail,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteU = await userModel.findByIdAndDelete(userId);
    if (!deleteU)
      return res
        .status(404)
        .send({ status: false, message: "User not found" });
    return res
      .status(200)
      .send({
        status: true,
        message: "User details deleted successfully"
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { getUserById, createUser, getUser, updateUser, deleteUser };

