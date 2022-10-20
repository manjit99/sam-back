const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  time: {
    type: String,
    required: [true, "time required"],
    default: new Date(),
  },
  PostedBy: {
    type: String,
    required: [true, "posted by required"],
    default: "Posted By Admin",
  },
  type: String,
  postImage: String,
  title: {
    type: String,
    required: [true, "title required"],
  },
  otherImages: [],
  importantLinks: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  description: String,
  lastActionTime:{
    type:Number,
  }
});

module.exports = mongoose.model("post", postSchema);
