const bookRouter = require("express").Router();

const bookApi = require("../controllers/book-controller");

const uploadStorage = require("../helper/file-uploader");

//routes
bookRouter.get("/", bookApi.fetchallBook);
bookRouter.get("/:id", bookApi.fetchParticularBook);
bookRouter.get("/last/getActionTime", bookApi.fetchLastActionTime);
bookRouter.delete("/:id", bookApi.deleteBook);
bookRouter.patch("/:id", uploadStorage.single("bookPhoto"), bookApi.updateBook);
bookRouter.post("/", uploadStorage.single("bookPhoto"), bookApi.createNewBook);

module.exports = bookRouter;
