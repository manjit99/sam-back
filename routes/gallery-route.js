const galleryRouter = require("express").Router();

const galleryApi = require("../controllers/gallery-controller");

const uploadStorage = require("../helper/file-uploader");

//routes
galleryRouter.get("/", galleryApi.fetchAllGallery);
galleryRouter.get("/last/getActionTime", galleryApi.fetchLastActionTime);
galleryRouter.get("/:id", galleryApi.fetchParticularGallery);
galleryRouter.post(
  "/",
  uploadStorage.array("galleryPhoto"),
  galleryApi.createNewGallery
);

module.exports = galleryRouter;
