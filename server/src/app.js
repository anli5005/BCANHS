const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const Subject = require("./models/subject");

require("dotenv").config();
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.DB_URL);

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
  res.send({ username: req.user.username, name: req.user.name });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/tutor/sessions/:subject", function(req, res) {
  User.find({ subjects: req.params.subject }, function(err, result) {
    if (err) {
      res.send("400");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/tutor/:tutor", function(req, res) {
  User.findOne({ username: req.params.tutor }, function(err, result) {
    if (err) {
      res.send("400");
    } else {
      res.send(result);
    }
  });
});

app.get("/subjects", function(req, res) {
  var query = Subject.find({}).select("name -_id");

  query.exec(function(err, result) {
    console.log(result);
    if (err) res.send(err);
    var reslist = [];
    result.forEach(el => {
      reslist.push(el.name);
    });
    res.send(reslist);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect("/login");
}

app.post("/tutor/update", isLoggedIn, function(req, res) {
  var userEmail = req.user;
  var newSubj = req.body.subject;
  var newAvail = req.body.availability;

  User.findOneAndUpdate(
    { username: userEmail },
    { availability: newAvail, subjects: newSubj },
  );
  res.send("200");
});

app.listen(process.env.PORT || 8081);
