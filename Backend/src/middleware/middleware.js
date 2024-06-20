const adminModel = require("../model/admin.model");
const product = require("../model/product.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, JWT_Expiry } = process.env;

//=====================Authentication==================

const authentication = async (req, res, next) => {
  try {
    const token = req.headers["X-Header-Key"] || req.headers["x-header-key"];
    if (!token) {
      return res.status(401).json({
        message: "Token Not Found",
      });
    }

    jwt.verify(token, JWT_SECRET, async (error, decoded) => {
      if (error) {
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
              status: false,
              message: "Token has expired, please log in again",
            });
          }
        return res.status(401).json({
          status: false,
          message: "Invalid Token, Authentication failed",
        });
      }
      // console.log("Decoded token:", decoded);
      const adminId = decoded.user_id;
      const admin = await adminModel.findById(adminId);
      if (!admin) {
        return res.status(401).json({
          message: "Unauthorized access",
        });
      }

      req.adminId = admin._id;
      req.admin = admin; // Optional: Attach the entire admin object if needed

      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//=====================/Authorizaton/====================

const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-header-key"];
    const decoded = jwt.verify(token, JWT_SECRET);

    let decodedUser = decoded.user_id;
    // console.log(decodedUser);

    let productId = req.params.id;
    // console.log(productId)

    let getProduct = await product.findById(productId);
    // console.log('Product:', getProduct);

    if (getProduct == null)
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });

    let admin = getProduct.adminId.toString();
    // console.log(admin);
    
    if (decodedUser !== admin)
      return res.status(400).send({
        status: false,
        message: "You are not authorised to perform this action",
      });

    next();
  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};


module.exports = { authentication, authorization };
