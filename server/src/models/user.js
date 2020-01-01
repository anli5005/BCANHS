const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  subjects: [String],
  availability: [[Number]],
  role: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
