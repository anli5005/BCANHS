const router = require("express").Router();
const Subject = require("../../models/Subject");
const Session = require("../../models/Session");
const Hour = require("../../models/Hour");
const User = require("../../models/User");

// @route   GET api/sessions/subject/:subject
// @desc    All sessions for a subject
// @access  Private
router.get("/subject/:subject", async (req, res) => {
  try {
    const subjectObj = await Subject.findById(req.params.subject);
    if (!subjectObj) return res.status(400).json({ msg: "Invalid Subject." });

    const sessions = await Session.find({ subjects: subjectObj.id });
    if (!sessions) return res.status(500).json({ msg: "Database error." });

    let hrTut = {};
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      for (let j = 0; j < session.hours.length; j++) {
        const hr = session.hours[j]._id;
        const tutor = await User.findById(session.tutor);
        if (!hrTut.hasOwnProperty(hr)) hrTut[hr] = [];
        hrTut[hr].push({
          name: tutor.name,
          email: tutor.username,
        });
      }
    }
    return res.json(hrTut);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/tutor/:tutor", async (req, res) => {
  const tutor = await User.findById(req.params.tutor);
  if (!tutor) return res.status(400).json({ msg: "Invalid Tutor." });

  return res.json({ email: tutor.username, name: tutor.name });
});

// @route   GET api/sessions/subjects
// @desc    All subjects
// @access  Private

router.get("/subjects", async (req, res) => {
  const subjects = await Subject.find({});
  if (!subjects) return res.status(500).json({ msg: "Database error." });
  return res.json(subjects);
});

// @route   GET api/sessions/hours
// @desc    All hours
// @access  Private

router.get("/hours", async (req, res) => {
  const hours = await Hour.find({});
  if (!hours) return res.status(500).json({ msg: "Database error." });
  return res.json(hours);
});

module.exports = router;
