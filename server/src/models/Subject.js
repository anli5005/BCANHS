const mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = Subject = mongoose.model("Subject", subjectSchema);
