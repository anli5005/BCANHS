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
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(`Error connecting to MongoDB:\n${err}`));

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

const createSessDates = async days => {
  hours = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (day == "") continue;
    // console.log(day);
    let mods = day.replace(/ /g, "").split(",");
    // console.log(mods);
    for (let j = 0; j < mods.length; j++) {
      const mod = mods[j];
      let hourX = hrs.indexOf(mod);
      let hour = await Hour.findOne({ hour: hourX, day: i });
      if (!hour)
        // console.log(
        //   "Hour error for day " + i + ", hour " + hourX + " (" + mod + ")",
        // );
        void 0;
      else hours.push(hour.id);
    }
  }
};

const createSubj = async subString => {
  let subStringClean = subString;
  if (subString === "AVPA-") subStringClean = "AVPA-T";

  let subject = await Subject.findOne({ name: subStringClean });
  if (!subject) console.log("Subject error for subject " + subStringClean);
  return subject.id;
};

const pushUser = async usr => {
  try {
    let result = await axios.post(
      process.env.BACKEND_URL + "api/auth/register",
      {
        name: usr.name,
        username: usr.username + "@bergen.org",
        password: crypto.randomBytes(32).toString("hex"),
      },
    );
    if (!result) console.log("Error Registering " + usr.name);
    else {
      console.log("Registered " + usr.name);
      let session = new Session({
        subjects: usr.subjects,
        hours: usr.hours,
      });
      let sessionCreate = await session.save();
      if (!sessionCreate) console.log("Error creating session");
      else {
        console.log("Created Session " + sessionCreate);
        let updateUsr = await User.findByIdAndUpdate(result.id, {
          avail: sessionCreate.id,
        });
        console.log(updateUsr);
        if (!updateUsr) console.log("Error Updating " + usr.name);
        else console.log("Updated " + usr.name);
      }
    }
  } catch (err) {
    void 0;
  }
};

const addOldUsers = async () => {
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
    currUser.subjects.push(createSubj(sess.session));
  });
  users.forEach(usr => {
    pushUser(usr);
  });
};

const main = () => {
  // clearAll();
  // addSubjs();
  // addHrs();
  addOldUsers();
};

main();
