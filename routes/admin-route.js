const adminRouter = require("express").Router();

const adminApi = require("../controllers/admin-controller");

//routes
adminRouter.get("/", adminApi.fetchAlladmin);
adminRouter.post("/", adminApi.signInAdminWhenValid);
// adminRouter.post("/",uploadStorage.single("postPhoto"), adminApi.fetchParticularadmin);

module.exports = adminRouter;
