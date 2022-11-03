var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const policy = new Schema(
  {
    title: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

// defining a Customer model
var Policy = mongoose.model("privacyAndPolicy", policy);
module.exports = Policy;
