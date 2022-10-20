const gallery = require("../models/gallery-model");

module.exports = class galleryApi {
  //all methods
  static async fetchAllGallery(req, res) {
    try {
      const allGallery = await gallery.find();
      res.status(200).json(allGallery);
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
      const allGallery = await gallery.find();
      allGallery.forEach((gallery) => {
        if (gallery.lastActionTime) {
          if (gallery.lastActionTime > lastEditedTime) {
            lastEditedTime = gallery.lastActionTime;
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

  //create issue
  static async createNewGallery(req, res) {
    const galleryObject = req.body;
    try {
      await gallery.create(galleryObject);
      res.status(200).json({
        message: "gallery created",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }

    // let galleryImages = [];

    // if (req.files) {
    //   req.files.forEach((file) => {
    //     galleryImages.push(file.filename);
    //   });
    // } else {
    //   galleryObject.galleryPhoto.forEach((v) => {
    //     galleryImages.push(v);
    //   });
    //   console.log(galleryImages)
    // }

    // if (galleryImages.length > 0) {
    //   galleryObject.images = galleryImages;
    //   try {
    //     await gallery.create(galleryObject);
    //     res.status(200).json({
    //       message: "gallery created",
    //     });
    //   } catch (error) {
    //     res.status(400).json({
    //       message: error.message,
    //     });
    //   }
    // } else {
    //   res.status(400).send({
    //     message: "gallery images missing",
    //   });
    // }
  }

  //fetch only one issue
  static async fetchParticularGallery(req, res) {
    const galleryId = req.params.id;

    if (galleryId) {
      try {
        const fetchedGallery = await gallery.findById(galleryId);
        if (!fetchedGallery) {
          res.send("No gallery found");
        } else {
          res.status(200).json(fetchedGallery);
        }
      } catch (error) {
        res.status(404).json({ mess: error.message });
      }
    } else {
      res.status(400).json({ message: "no id found" });
    }
  }
};
