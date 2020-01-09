const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
  hours: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hour",
      required: true,
    },
  ],
});

module.exports = Session = mongoose.model("Session", sessionSchema);
