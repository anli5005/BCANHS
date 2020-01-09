const User = require("../../models/User");
const ResetPassword = require("../../models/ResetPassword");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route   POST /api/auth
// @desc    Authenticate User
// @access  Public

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res.status(400).json({ msg: "Please Enter All Fields" });

  // Check for existing user
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User Does Not Exist" });

  try {
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ msg: "Invalid Password" });

    const token = await jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: 21600,
    });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error Authenticating User" });
  }
});

// @route   POST /api/auth/register
// @desc    Register New User
// @access  Public

router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  // Simply validation
  if (!name || !username || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  // Check for existing user
  const user1 = await User.findOne({ username });

  if (user1)
    return res
      .status(400)
      .json({ msg: "User with given email already exists" });

  // Create User
  const newUser = new User({ name, username, password });

  try {
    // Create password hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;
    let user = await newUser.save();

    const token = await jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: 86400,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error Creating User" });
  }
});

// @route   POST /api/auth/forgot
// @desc    Forgot Password
// @access  Public

router.post("/forgot", async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ msg: "User does not exist" });

  await ResetPassword.findOneAndDelete({ user: user.id });

  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetDoc = new ResetPassword({ token: resetToken, user: user.id });
    resetDoc.save();

    const msg = {
      to: user.username,
      from: process.env.EMAIL_FROM,
      subject: "BCA NHS Password Reset",
      text: "Reset your password.",
      html:
        "<h4><b>Reset Password</b></h4>" +
        "<p>Either you or someone else recently requested to reset your BCA NHS password. If this was you, please click the link below to reset your password. If this wasn't you then ignore this email.</p>" +
        "<a href=" +
        process.env.CLIENT_URL +
        "/reset/" +
        user.id +
        "/" +
        resetToken +
        '">' +
        process.env.CLIENT_URL +
        "/reset/" +
        user.id +
        "/" +
        resetToken +
        "</a>" +
        "<br><br>" +
        "<p>--BCA NHS</p>",
    };
    let sentMail = await sgMail.send(msg);
    res.status(200).json({
      msg: "Email sent successfully to " + user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

// @route   POST /api/auth/reset
// @desc    Reset Password
// @access  Public

router.post("/reset", async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

  const forgotDoc = await ResetPassword.findOne({
    token: token,
  });
  if (!forgotDoc) {
    return res.status(400).json({
      msg:
        "Token invalid or expired. If you want to reset your password please fill out the form again.",
    });
  }

  const user = await User.findByIdAndUpdate(forgotDoc.user, {});

  try {
    // Create password hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    await user.save();

    const token = await jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: 86400,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error Updating User" });
  }
});

module.exports = router;
