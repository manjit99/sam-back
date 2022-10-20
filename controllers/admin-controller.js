const adminModel = require("../models/admin-model");

module.exports = class adminApi {
  //all methods
  static async fetchAlladmin(req, res) {
    console.log(req.body);
    try {
      const alladmin = await adminModel.find();
      res.status(200).json(alladmin);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
  static async signInAdminWhenValid(req, res) {
    var incomingAdmin = req.body;
    try {
      var matchFound = false;
      const alladmin = await adminModel.find();
      alladmin.forEach((admin) => {
        if (
          admin.adminEmail === incomingAdmin.adminEmail &&
          admin.adminPassword === incomingAdmin.adminPassword
        ) {
          matchFound = true;
          res.status(200).end();
        }
      });
      if (!matchFound) {
        res.status(404).json({
          message: "Admin not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
  //create issue
  static async createNewadmin(req, res) {
    var adminObject = req.body;

    if (!adminObject) {
      return res.status(400).send({
        message: "Empty admin object",
      });
    }

    try {
      await adminModel.create(adminObject);
      res.status(200).json({
        message: "admin created",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};
