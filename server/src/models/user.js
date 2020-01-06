const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  _id: String,
  username: String,
  password: String,
  name: String,
  subjects: [String],
  availability: [[Boolean]],
  role: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
