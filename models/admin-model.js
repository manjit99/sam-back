const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: [true, "name required"],
  },
  adminEmail: {
    type: String,
    required: [true, "email required"],
  },
  adminPassword: {
    type: String,
    required: [true, "password required"],
  },
});

module.exports = mongoose.model("adminModel", adminSchema);
