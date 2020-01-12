const mongoose = require("mongoose");
const Hour = require("./models/Hour");
const Subject = require("./models/Subject");
const Session = require("./models/Session");
const User = require("./models/User");
const axios = require("axios");
const oldSess = require("./dbbackup");
const crypto = require("crypto");
require("dotenv").config();

const db = process.env.DB;

const clearAll = () => {
  Subject.remove({}, function(err) {
    if (err) console.log("Failed to clear Subjects");
    else console.log("Cleared Subjects");
  });

  Hour.remove({}, function(err) {
    if (err) console.log("Failed to clear Hours");
    else console.log("Cleared Hours");
  });

  Session.remove({}, function(err) {
    if (err) console.log("Failed to clear Sessions");
    else console.log("Cleared Sessions");
  });

  User.remove({}, function(err) {
    if (err) console.log("Failed to clear Users");
    else console.log("Cleared Users");
  });
};

const subjects = [
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
  "AVPA-T",
  "AVPA-M",
  "AVPA-V",
  "SAT",
  "ACT",
];

const hrs = [
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

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const addSubjs = () => {
  subjects.forEach(s => {
    let newSub = new Subject({ name: s });
    newSub.save(function(err, sub) {
      if (err) {
        console.log(err);
      } else {
        console.log("saved " + sub.name);
      }
    });
  });
};

const addHrs = () => {
  for (let i = 0; i < hrs.length; i++) {
    const hr = hrs[i];
    for (let j = 0; j < days.length; j++) {
      const day = days[j];
      let newHr = new Hour({ name: day + " " + hr, day: j, hour: i });
      newHr.save(function(err, hr) {
        if (err) {
          console.log(err);
        } else {
          console.log("saved " + hr.name);
        }
      });
    }
  }
};

const createSessDates = days => {
  hours = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (day == "") continue;
    // console.log(day);
    let mods = day.replace(/ /g, "").split(",");
    console.log(mods);
    for (let j = 0; j < mods.length; j++) {
      const mod = mods[j];
      let hourX = hrs.indexOf(mod);
      hours.push({ hour: hourX, day: i });
    }
  }
  return hours;
};

const createSubj = subString => {
  let subStringClean = subString;
  if (subString === "AVPA-") subStringClean = "AVPA-T";

  Subject.findOne({ name: subStringClean })
    .then(subject => {
      return subject.id;
    })
    .catch(err => {
      console.log("Subject error for subject " + subStringClean);
    });
};

const pushUser = usr => {
  axios
    .post(process.env.BACKEND_URL + "api/auth/register", {
      name: usr.name,
      username: usr.username + "@bergen.org",
      password: crypto.randomBytes(32).toString("hex"),
    })
    .then(res => {
      console.log("Registered " + res.data.user.name);
      axios
        .post(process.env.BACKEND_URL + "api/users/update/verbose", {
          user: res.data.user.id,
          hours: usr.hours,
          subjects: usr.subjects,
        })
        .then(user => {
          console.log(user);
        })
        .catch(err => {
          console.log("Error Updating " + usr.name);
          console.log(err.response.data);
        });
    })
    .catch(err => console.log("Error registering " + usr.name));
};

const addOldUsers = () => {
  oldSess.sort((a, b) => (a.tutor_username > b.tutor_username ? 1 : -1));
  users = [];
  currUser = {};
  oldSess.forEach(sess => {
    if (sess.tutor_username !== currUser.username) {
      if (currUser) users.push(currUser);
      currUser = {};
      currUser.username = sess.tutor_username;
      currUser.name = sess.tutor;
      currUser.hours = createSessDates([
        sess.monday,
        sess.tuesday,
        sess.wednesday,
        sess.thursday,
        sess.friday,
      ]);
      currUser.subjects = [];
    }
    currUser.subjects.push(sess.session);
  });
  users.forEach(usr => {
    pushUser(usr);
  });
};

const main = () => {
  addSubjs();
  addHrs();
  addOldUsers();
};

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    clearAll();
    main();
  })
  .catch(err => console.log(`Error connecting to MongoDB:\n${err}`));
