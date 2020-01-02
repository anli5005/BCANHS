const mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("subject", subjectSchema);
