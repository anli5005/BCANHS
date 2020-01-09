const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
});

module.exports = Hour = mongoose.model("Hour", hourSchema);
