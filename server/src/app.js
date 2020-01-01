const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

require("dotenv").config();
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.DB_URL);

// var subjectSchema = new mongoose.Schema({
//   name: String,
// });

// var Subject = mongoose.model("subject", subjectSchema);

app.use(
  require("express-session")({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      return res.send(err);
    }
    console.log(user);
    passport.authenticate("local")(req, res, function() {
      res.send(req.user);
    });
  });
});

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.send(req.user);
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// app.post("/login", function(req, res) {});

app.get("/tutor/sessions/:subject", function(req, res) {
  User.find({ subjects: req.params.subject }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// app.post("/tutor/update", isLoggedIn, function(req, res) {
//   // var userEmail = req.user;
//   var userEmail = "aidgli20@bergen.org";
//   var newSubj = req.body.subject;
//   var newAvail = req.body.availability;

//   User.findOneAndUpdate(
//     { email: userEmail },
//     { availability: newAvail, subjects: newSubj },
//   );
//   res.redirect("/");
// });

app.listen(process.env.PORT || 8081);
