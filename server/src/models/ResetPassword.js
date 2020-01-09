const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Utils = require("../utils");

const resetSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

resetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = ResetPassword = mongoose.model("ResetPassword", resetSchema);
