const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      //   trim: true
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    MaximumStockLevel:{
      type: Number,
      required: true,
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  },
  {
    timestamps: true,
  }
);

const productStorage = mongoose.model("Product", ProductSchema);
module.exports = productStorage;
