const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Subject = require("../../models/Subject");
const Hour = require("../../models/Hour");
const Session = require("../../models/Session");

// @route   GET api/users
// @desc    Get user data
// @access  Private
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

router.get("/session", auth, (req, res) => {
  console.log(req.user.id);
  Session.findOne({ tutor: req.user.id })
    .then(session => {
      console.log(session);
      res.json(session);
    })
    .catch(err => res.status(400).json({ msg: err }));
});

// @route   POST api/users/update
// @desc    Update user session
// @access  Private
router.post("/update", auth, (req, res) => {
  Session.findOneAndUpdate(
    { tutor: req.user.id },
    { hours: req.body.hours, subjects: req.body.subjects },
  )
    .then(() => res.json({ msg: "Updated Successfully" }))
    .catch(err => res.status(400).json({ msg: err }));
});

router.post("/update/verbose", async (req, res) => {
  try {
    var subjects = [];
    for (let i = 0; i < req.body.subjects.length; i++) {
      var sub = req.body.subjects[i];
      if (sub === "AVPA-") sub = "AVPA-T";
      let subject = await Subject.findOne({ name: sub });
      if (!subject) console.log("Error finding sub " + sub);
      else subjects.push(subject.id);
    }

    var hours = [];
    for (let i = 0; i < req.body.hours.length; i++) {
      const hr = req.body.hours[i];
      let hour = await Hour.findOne({ day: hr.day, hour: hr.hour });
      if (!hour) console.log("Error finding " + hour);
      else hours.push(hour.id);
    }

    console.log(hours);

    let sess = new Session({
      hours: hours,
      subjects: subjects,
      tutor: req.body.user,
    });

    let session = await sess.save();
    if (!session) res.status(500).json({ msg: "DB Error" });

    res.json({ session });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
