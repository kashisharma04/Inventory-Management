const mongoose = require("mongoose");

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
};

const usertrackSchema = new mongoose.Schema(
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
    mobile: {
      type: Number,
      required: true,
      unique: true,
      // match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    componentname: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      // min: [1, 'Quantity must be at least 1']
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    returnDate : {
      type : Date,
      default: getTomorrowDate,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usertrackSchema);
module.exports = User;
