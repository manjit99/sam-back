const postRouter = require("express").Router();

const postApi = require("../controllers/post-controller");

const uploadStorage = require("../helper/file-uploader");

//routes
postRouter.get("/", postApi.fetchAllPost);
postRouter.get("/last/getActionTime", postApi.fetchLastActionTime);

postRouter.get("/:id", postApi.fetchOnePost);
postRouter.post("/", uploadStorage.array("postPhoto"), postApi.createNewPost);
postRouter.patch(
  "/:id",
  uploadStorage.array("postPhoto"),
  postApi.updatePostLatest
);
postRouter.delete("/:id", postApi.deletePost);

module.exports = postRouter;
