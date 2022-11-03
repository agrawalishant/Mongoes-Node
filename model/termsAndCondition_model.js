var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const terms = new Schema(
  {
    title: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

// defining a Customer model
var Terms = mongoose.model("TermsAndCondition", terms);
module.exports = Terms;
