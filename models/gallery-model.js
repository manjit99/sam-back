const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  title: String,
  images: [String],
  lastActionTime: {
    type: Number,
  },
});

module.exports = mongoose.model("gallery", gallerySchema);
