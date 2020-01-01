const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.NEW_DB_URL);

var oldSess = require("./dbbackup");

oldSess.sort((a, b) => (a.tutor_username > b.tutor_username ? 1 : -1));

mods = [
  "1-3",
  "4-6",
  "7-9",
  "10-12",
  "13-15",
  "16-18",
  "19-21",
  "22-24",
  "25-27",
];

function modsToArr(days) {
  var avail = [];
  days.forEach(d => {
    avail.push(d.split(", "));
  });
  return avail;
}

function cleanSess(sess) {
  return {
    id: sess.tutor_username,
    name: sess.tutor,
    subjects: [sess.session],
    availability: modsToArr([
      sess.monday,
      sess.tuesday,
      sess.wednesday,
      sess.thursday,
      sess.friday,
    ]),
  };
}

function multiUnion(m1, m2) {
  // union of multidimensional arrays of same length
  res = [];
  for (let i = 0; i < m2.length; i++) {
    res.push([...new Set([...m1[i], ...m2[i]])]);
  }
  return res;
}

users = [];
var currUser = {};
oldSess.forEach(sess => {
  if (sess.tutor_username === currUser.id) {
    if (currUser.subjects.indexOf(sess.session) < 0) {
      currUser.subjects.push(sess.session);
    }
    currUser.availability = multiUnion(
      currUser.availability,
      modsToArr([
        sess.monday,
        sess.tuesday,
        sess.wednesday,
        sess.thursday,
        sess.friday,
      ]),
    );
  } else {
    if (currUser) {
      users.push(currUser);
    }
    currUser = cleanSess(sess);
  }
});
users.push(currUser);

var newUserSchema = new mongoose.Schema({
  bergen_id: String,
  name: String,
  subjects: [String],
  availability: [[String]],
});

var NewUser = mongoose.model("tutor", newUserSchema);

users.forEach(user => {
  var newuser = new NewUser({
    bergen_id: user.id,
    name: user.name,
    subjects: user.subjects,
    availability: user.availability,
  });
  newuser.save(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log("saved " + user.name);
    }
  });
});
