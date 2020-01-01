const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const OutlookStrategy = require("passport-outlook").Strategy;

require("dotenv").config();

mongoose.connect(process.env.DB_URL);

var tutorSessSchema = new mongoose.Schema({
  tutorID: String,
  subjects: [String],
  availability: [[Number]],
});

var tutorSess = mongoose.model("tutorSess", tutorSessSchema);

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
  res.send({
    message: "Ya in!",
  });
});

app.listen(process.env.PORT || 8081);
