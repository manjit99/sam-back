const issue = require("../models/issue-model");

module.exports = class IssueApi {
  //all methods
  static async fetchAllIssues(req, res) {
    try {
      const allIssues = await issue.find();
      res.status(200).json(allIssues);
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
      const allIssues = await issue.find();

      allIssues.forEach((issue) => {
        if (issue.lastActionTime) {
          if (issue.lastActionTime > lastEditedTime) {
            lastEditedTime = issue.lastActionTime;
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
  static async createNewSampritiIssue(req, res) {
    const issueObject = req.body;
    try {
      await issue.create(issueObject);
      res.status(200).json({
        message: "Issue created",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  //fetch only one issue
  static async fetchOneIssue(req, res) {
    const issueId = req.params.id;

    if (issueId) {
      try {
        const derivedIssue = await issue.findById(issueId);
        if (!derivedIssue) {
          res.send("No Issue found");
        } else {
          res.status(200).json(derivedIssue);
        }
      } catch (error) {
        res.status(404).json({ mess: error.message });
      }
    } else {
      res.status(400).json({ message: "no id found" });
    }
  }
};
