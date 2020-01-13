const router = require("express").Router();
const Subject = require("../../models/Subject");
const Session = require("../../models/Session");

// @route   GET api/sessions/subject
// @desc    All sessions for a subject
// @access  Private
router.get("/subject", async (req, res) => {
  const subject = req.body.subject;
  const subjectObj = await Subject.findOne({ name: subject });
  if (!subjectObj) return res.status(400).json({ msg: "Invalid Subject." });

  const sessions = await Session.find({ subjects: subjectObj.id });
  console.log(sessions);
  if (!sessions) return res.status(500).json({ msg: "Database error." });
  res.json(sessions);
});

// @route   GET api/sessions/subjects
// @desc    All subjects
// @access  Private

router.get("/subjects", async (req, res) => {
  const subjects = await Subject.find({});
  if (!subjects) return res.status(500).json({ msg: "Database error." });
  res.json(subjects);
});

// @route   GET api/sessions/hours
// @desc    All hours
// @access  Private

router.get("/hours", async (req, res) => {
  const hours = await Hour.find({});
  if (!hours) return res.status(500).json({ msg: "Database error." });
  res.json(hours);
});

module.exports = router;
