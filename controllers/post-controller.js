const post = require("../models/post-model");

const fs = require("fs");

module.exports = class postApi {
  //all methods
  static async fetchAllPost(req, res) {
    try {
      const allpost = await post.find();
      res.status(200).json(allpost);
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
      const allPost = await post.find();

      allPost.forEach((post) => {
        if (post.lastActionTime) {
          if (post.lastActionTime > lastEditedTime) {
            lastEditedTime = post.lastActionTime;
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
  static async createNewPost(req, res) {
    const postObject = req.body;

    if (!postObject.title) {
      return res.status(400).send("PostTitle is required");
    }
    let postImage;
    let otherPostImages = [];
    //name of post image
    var postImageName = postObject.postImageName;

    if (req.files.length > 0) {
      if (postImageName.length !== 0) {
        req.files.forEach((file) => {
          if (
            file.filename.toLowerCase().includes(postImageName.toLowerCase())
          ) {
            postImage = file.filename;
          } else {
            otherPostImages.push(file.filename);
          }
        });
      } else {
        req.files.forEach((file) => {
          otherPostImages.push(file.filename);
        });
      }

      postObject.postImage = postImage;
      postObject.otherImages = otherPostImages;

      try {
        await post.create(postObject);
        res.status(200).json({
          message: "Post created",
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
    } else {
      try {
        await post.create(postObject);
        res.status(200).json({
          message: "Post created",
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  // //fetch only one issue
  static async fetchOnePost(req, res) {
    const postId = req.params.id;

    if (postId) {
      try {
        const derivedPost = await post.findById(postId);
        if (!derivedPost) {
          res.send("No post found");
        } else {
          res.status(200).json(derivedPost);
        }
      } catch (error) {
        res.status(404).json({ mess: error.message });
      }
    } else {
      res.status(400).json({ message: "no id found" });
    }
  }

  //delete post
  static async deletePost(req, res) {
    const itemId = req.params.id;

    if (itemId) {
      try {
        await post.findByIdAndDelete(itemId);
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

  static async updatePostLatest(req, res) {
    const postId = req.params.id;

    var modifiedPost = req.body;

    //now upadate the post
    try {
      await post.findByIdAndUpdate(postId, modifiedPost);
      if (req.body.deleteAllLink) {
        await post.findByIdAndUpdate(postId, {
          $set: {
            importantLinks: [],
          },
        });
      }
      res.status(200).json({
        message: "Post upadated",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};
