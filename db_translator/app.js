const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.NEW_DB_URL);

var oldSess = require("./dbbackup");

oldSess.sort((a, b) => (a.tutor_username > b.tutor_username ? 1 : -1));

var valMods = [
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
  var avail = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
  ];
  // days.forEach(d => {
  //   var modList = d.split(", ");
  //   // modList.forEach(mod => {
  //   //   var hr = valMods.indexOf(mod);
  //   //   if (hr !== -1) hrList.add();
  //   // });
  //   // avail.push([...hrList]);
  //   for (let i = 0; i < modList.length; i++) {
  //     const mod = modList[i];
  //     const hr = valMods.indexOf(mod);
  //     if (hr !== -1) avail[i][hr] = true;
  //   }
  // });
  for (let d = 0; d < days.length; d++) {
    var modList = days[d].split(", ");

    for (let i = 0; i < modList.length; i++) {
      const mod = modList[i];
      const hr = valMods.indexOf(mod);
      if (hr !== -1) avail[d][hr] = true;
    }
  }
  console.log(avail);
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
    currUser.availability = modsToArr([
      sess.monday,
      sess.tuesday,
      sess.wednesday,
      sess.thursday,
      sess.friday,
    ]);
  } else {
    if (currUser) {
      users.push(currUser);
    }
    currUser = cleanSess(sess);
  }
});
users.push(currUser);

var newUserSchema = new mongoose.Schema({
  username: String,
  name: String,
  subjects: [String],
  availability: [[Boolean]],
  role: String,
});

var newUser = mongoose.model("user", newUserSchema);

users.forEach(user => {
  var newuser = new User({
    username: user.id + "@bergen.org",
    name: user.name,
    subjects: user.subjects,
    availability: user.availability,
    role: "Member",
  });
  console.log(user.availability);
  newuser.save(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      // console.log("saved " + user.name);
    }
  });
});

var newuser = new newUser({
  username: "aidgli20@bergen.org",
  name: "Aidan Glickman",
  subjects: ["ATCS", "Math", "ACT"],
  availability: [
    [true, true, true, true, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false],
  ],
  role: "God",
});
newuser.save(function(err, user) {
  if (err) {
    console.log(err);
  } else {
    // console.log("saved " + user.name);
  }
});

var newrecruits = require("./acceptedemails");

newrecruits.forEach(i => {
  var newuser = new newUser({
    username: i[2],
    name: i[1] + " " + i[0],
    subjects: [],
    availability: [[], [], [], [], []],
    role: "Member",
  });
  newuser.save(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      // console.log("saved " + user.name);
    }
  });
});

var subjectSchema = new mongoose.Schema({
  name: String,
});

var Subject = mongoose.model("subject", subjectSchema);

var subjects = [
  "Math",
  "Literature",
  "History",
  "French",
  "Spanish",
  "Mandarin",
  "Chemistry",
  "Biology",
  "Physics",
  "AMST",
  "AAST",
  "AEDT",
  "ATCS",
  "ABF",
  "ACAHA",
  "AVPA-",
  "AVPA-M",
  "AVPA-V",
  "SAT",
  "ACT",
];

subjects.forEach(sub => {
  var newSub = new Subject({
    name: sub,
  });
  newSub.save(function(err, sub) {
    if (err) {
      console.log(err);
    } else {
      // console.log("saved " + sub.name);
    }
  });
});
