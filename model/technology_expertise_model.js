var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TechnologyExperyise = new Schema(
  {
    title: { type: String },
    body: { type: String },
    image: { type: String },
    alt: {type: String},
  },
  { timestamps: true }
);

// defining a Customer model
var Technology = mongoose.model("TechnologyExpertise", TechnologyExperyise);
module.exports = Technology;
