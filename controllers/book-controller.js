const book = require("../models/book-model");

module.exports = class bookApi {
  //fetch all stored books
  static async fetchallBook(req, res) {
    try {
      const allBook = await book.find();
      res.status(200).json(allBook);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
  //get the lastAction time
  static async fetchLastActionTime(req, res) {
    try {
      let lastEditedTime = 0;
      const allBooks = await book.find();

      allBooks.forEach((book) => {
        if (book.lastActionTime) {
          if (book.lastActionTime > lastEditedTime) {
            lastEditedTime = book.lastActionTime;
          }
        }
      });
      res.status(200).json(lastEditedTime);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
  //create book
  static async createNewBook(req, res) {
    const bookObject = req.body;

    try {
      await book.create(bookObject);
      res.status(200).json({
        message: "book created",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  //fetch only one book
  static async fetchParticularBook(req, res) {
    const bookId = req.params.id;

    if (bookId) {
      try {
        const fetchedBook = await book.findById(bookId);
        if (!fetchedBook) {
          res.send("No book found");
        } else {
          res.status(200).json(fetchedBook);
        }
      } catch (error) {
        res.status(404).json({ mess: error.message });
      }
    } else {
      res.status(400).json({ message: "no id found" });
    }
  }

  //delete book
  static async deleteBook(req, res) {
    const itemId = req.params.id;

    if (itemId) {
      try {
        await book.findByIdAndDelete(itemId);
        res.status(200).json({
          message: "Deleted",
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
    }
  }
  //update book
  static async updateBook(req, res) {
    const bookID = req.params.id;

    var modifiedBook = req.body;
    console.log(bookID);
    console.log(modifiedBook);
    //now upadate the book
    try {
      await book.findByIdAndUpdate(bookID, modifiedBook);
      res.status(200).json({
        message: "book upadated",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};
