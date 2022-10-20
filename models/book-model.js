const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Name required?"],
  },
  amazonSellLink: {
    type: String,
    required: [true, 'amazon sell link required?']
  },
  authorName: {
    type: String,
    required: [true, "Author required?"],
  },
  authorDetails: {
    type: String,
    required: [true, "Author details required?"],
  },
  bookDescription: {
    type: String,
    required: [true, "Book description required?"],
  },
  bindingType: {
    type: String,
    required: [true, "Binding type required?"],
  },
  publisher: {
    type: String,
    required: [true, "Publisher required?"],
  },
  genre: {
    type: String,
    required: [true, "Genre required?"],
  },
  isbn: {
    type: String,
    required: [true, "ISBN required?"],
  },
  sellerName: {
    type: String,
    required: [true, "SellerName required?"],
  },
  noOfPages: {
    type: String,
    required: [true, "No of pages required?"],
  },
  pubYear: {
    type: String,
    required: [true, "Publication required?"],
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl required?"],
  },
  languageList: {
    type: [String],
    required: [true, "Language required?"],
  },
  mrp: {
    type: String,
    required: [true, "MRP required?"],
  },
  discount: {
    type: String,
    required: [true, "Discount required?"],
  },
  currentPrice: {
    type: String,
    required: [true, "curretPrice required?"],
  },
  lastActionTime:{
    type:Number,
  }
});

module.exports = mongoose.model("book", bookSchema);
