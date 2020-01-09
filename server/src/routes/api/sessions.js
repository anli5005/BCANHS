const router = require("express").Router();
const Subject = require("../../models/Subject");
const Session = require("../../models/Session");

// @route   GET api/sessions
// @desc    Get user data
// @access  Private
router.get("/", async (req, res) => {
  const subject = req.body.subject;
  const subjectObj = await Subject.findOne({ name: subject });
  if (!subjectObj) return res.status(400).json({ msg: "Invalid Subject." });

  const sessions = await Session.find({ subject: subjectObj.id });
  if (!sessions) return res.status(500).json({ msg: "Database error." });
  res.json(sessions);
});

module.exports = router;
