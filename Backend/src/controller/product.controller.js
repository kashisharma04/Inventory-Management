const Product = require("../model/product.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

// Create a new product
const createProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send({ status: false, message: "File upload error" });
      } else if (err) {
        return res.status(500).send({ status: false, message: "Internal server error" });
      }

      try {
        const {
          productName,
          category,
          description,
          quantity,
          price,
          purchaseDate,
          warrantyCheck,
          minimumStockLevel,
        } = req.body;

        let image = "";
        if (req.file) {
          image = req.file.filename;
        }
        
        // Validation checks
        if (!productName) {
          return res.status(400).send({ status: false, message: "Product name is required" });
        }
        if (!description) {
          return res.status(400).send({ status: false, message: "Description is required" });
        }
        if (!price) {
          return res.status(400).send({ status: false, message: "Price is required" });
        }
        if (!quantity) {
          return res.status(400).send({ status: false, message: "Please add quantity" });
        }

        // Create the product
        const newProduct = await Product.create({
          productName,
          category,
          description,
          image,
          quantity,
          price,
          purchaseDate,
          warrantyCheck,
          minimumStockLevel,
          // adminId: req.adminId, // Assuming adminId is available in req
        });

        return res.status(201).send({
          status: true,
          message: "Product created successfully",
          data: newProduct,
        });
      } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
      }
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


//================/GET METHOD/==================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send({ status: true, data: products });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Retrieve a single product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .send({ status: false, message: "Product not found" });
    return res.status(200).send({ status: true, data: product });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//================/PUT METHOD/==================================
// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = { ...req.body, updatedAt: Date.now() };
    const pro = await Product.findById(productId);
    if (!pro) {
      return res
        .status(404)
        .send({ status: false, message: "Product not found in database" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    if (!updatedProduct)
      return res
        .status(404)
        .send({ status: false, message: "Product not found" });
    return res.status(200).send({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//================/DELETE METHOD/==================================
// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res
        .status(404)
        .send({ status: false, message: "Product not found in database" });
    return res.status(200).send({
      status: true,
      message: "Product deleted successfully",
      // data: deletedProduct,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  upload,
};
