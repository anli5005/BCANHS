const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Session = require("../../models/Session");

// @route   GET api/users
// @desc    Get user data
// @access  Private
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

// @route   POST api/users/update
// @desc    Update user session
// @access  Private
router.post("/update", auth, (req, res) => {
  User.findByIdAndUpdate(req.user.id, {
    session: new Session({
      hours: req.body.hours,
      subjects: req.body.subjects,
    }),
  }).then(user => res.json(user));
});

module.exports = router;
