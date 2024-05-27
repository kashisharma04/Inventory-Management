const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        // trim: true,
        // match: [/.+\@.+\..+/, 'Please enter a valid email address']
      },
      password: {
        type: String,
        required: true
      },
    //   role: {
    //     type: String,
    //     default: "admin",
    //     enum: ["admin", "superadmin"]
    //   },
    },
    {
      timestamps: true
    }
  );


module.exports = mongoose.model("Admin", adminSchema); ;