var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ourTechnology = new Schema(
  {
    title: { type: String },
    body: { type: String },
    image: { type: String },
    alt: {type: String},
    //    title1: {type: String}
  },
  { timestamps: true }
);

// defining a Customer model
var OurTechnology = mongoose.model("ourTechnology", ourTechnology);
module.exports = OurTechnology;
