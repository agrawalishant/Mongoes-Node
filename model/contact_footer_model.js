var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const contactFooter = new Schema(
  {
    title: { type: String },
    image: { type: String }
  },
  { timestamps: true }
);

// defining a Customer model
var ContactFooter = mongoose.model("footerBanner", contactFooter);
module.exports = ContactFooter;
