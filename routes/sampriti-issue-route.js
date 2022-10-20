const sampritiIsssuerouter = require("express").Router();

const IssueApi = require("../controllers/issue-controller");

const uploadStorage = require("../helper/file-uploader");

//routes
sampritiIsssuerouter.get("/", IssueApi.fetchAllIssues);
sampritiIsssuerouter.get("/:id", IssueApi.fetchOneIssue);
sampritiIsssuerouter.get("/last/getActionTime", IssueApi.fetchLastActionTime);

sampritiIsssuerouter.post(
  "/",
  uploadStorage.single("issuePhoto"),
  IssueApi.createNewSampritiIssue
);

module.exports = sampritiIsssuerouter;
