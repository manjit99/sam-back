//all imports
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var corsOptions = {
  "origin": "https://manjit99.github.io/front/",
  "optionSuccessStatus": 200,
};

const path = require("path");
const history = require("connect-history-api-fallback");

const port = process.env.PORT || 5000;

//middlewares
app.use(cors(corsOptions));
app.use(history());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "uploads/")));
app.use(express.static(path.join(__dirname, "dist")));
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

//database connection
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: false,
    useNewUrlParser: true,
    maxIdleTimeMS: 80000,
    serverSelectionTimeoutMS: 80000,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
  })
  .then(() => console.log("database connected"))
  .catch((err) => {
    console.log(err);
  });

//routes prefixes
app.use("/api/admin", require("./routes/admin-route"));
app.use("/api/issue", require("./routes/sampriti-issue-route"));
app.use("/api/post", require("./routes/all-post-route"));
app.use("/api/gallery", require("./routes/gallery-route"));
app.use("/api/book", require("./routes/book-route"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
  // res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

//start server
app.listen(port);
