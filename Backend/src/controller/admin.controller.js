const adminDetails = require('../model/admin.model')
const jwt = require('jsonwebtoken')
const { isValidEmail , isValidRequestBody  } = require('../validations/valid');

require('dotenv').config();
const { JWT_SECRET} = process.env

const createAdmin = async function (req, res) {
    try {
        let admin= req.body
        const { name, email, password, createdAt, updatedAt} = admin;

        //checking for required fields
        if (!name) { return res.status(400).send({ status: false, message: "user name is required" }) }

        if (!email) { return res.status(400).send({ status: false, message: "email is required" }) }

        if (!password) { return res.status(400).send({ status: false, message: "password is required" }) }

        if (password.length < 6) return res.status(400).send({ status: false, message: "Password length should be greater than 6 characters" })

        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Enter the valid email" }) }

        //checking for unique mail
        const uniqueMail = await adminDetails.findOne({ email: email });
        if (uniqueMail) return res.status(400).send({ status: false, message: "this email already exist" });
        
        let adminCreated = await adminDetails.create(admin)
        return res.status(201).send({ status: true, msg:"Admin Created Successfully", data: adminCreated })
    }
    
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}
//==================CRUD METHODS================================
//================/GET METHOD/==================================

const getAdmin = async function (req, res) {
    try {
        const user = await adminModel.find()
        res.status(200).send({ status: true, msg:"Admin Data", data: user });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: 'Internal Server Error' });
    }
};
// Retrieve a single product by ID
const getAdminById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await adminModel.findById(userId);
        if (!user) return res.status(404).send({ status: false, message: "Admin not found" });
        return res.status(200).send({ status: true, data: user });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//===============Login-User==========================

const generateToken = (admin) => {
    return jwt.sign({ admin_id: admin._id }, JWT_SECRET, JWT_Expiry);
};

const login = async (req, res) => {
    try {
        if (!isValidRequestBody(req.body)) {
            res.status(400).json({
                status: false,
                message: 'Invalid Request Parameters, Please provide login details'
            });
            
        }
        const {
            email,
            password
        } = req.body

        if (!isValidEmail(email)) {
            res.status(400).json({
                status: false,
                message: "Email is required"
            })
        }

        if (!(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email))) {
            res.status(400).json({
                status: false,
                message: "Email should be valid email."
            })
        }

        if (!email || !password) return res.status(400).json({
            message: "Please enter email and password"
        })

        const user = await adminDetails.findOne({
            email: email,
            password : password
        })

        if (!user) return res.status(401).json({
            status: false,
            message: 'You are not registered'
        })
        // console.log(user.password)
        
        if (password) {
            const token = jwt.sign({
                user_id: user._id,
            }, JWT_SECRET)
            // const token = generateToken(admin)

            res.header('x-header-key', token)

            res.status(200).json({
                status: true,
                data: {
                    token
                }
            })
        } else {
            return res.status(401).send({
                status: false,
                message: "not a authenticate user"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
const updateAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const updateData = req.body;
    //   const ad = await adminDetails.findById({_id});
    //   if(!ad){
    //       return res
    //       .status(404)
    //       .send({ status: false, message: "Product not found in database" });
    //   }
      const updatedadmindetail = await adminDetails.findByIdAndUpdate(
        adminId,
        updateData,
        { new: true }
      );
      if (!updatedadmindetail)
        return res
          .status(404)
          .send({ status: false, message: "Admin not registered" });
      return res
        .status(200)
        .send({
          status: true,
          message: "Admin details updated successfully",
          data: updatedadmindetail,
        });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  const deleteAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const deletead = await adminDetails.findByIdAndDelete(adminId);
      if (!deletead)
        return res
          .status(404)
          .send({ status: false, message: "Admin not found" });
      return res
        .status(200)
        .send({
          status: true,
          message: "Admin details deleted successfully",
          // data: deletedProduct,
        });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
  
module.exports = {getAdminById, createAdmin, login, getAdmin , updateAdmin , deleteAdmin};

