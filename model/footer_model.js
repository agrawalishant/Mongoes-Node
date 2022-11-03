var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const footer = new Schema(
  {
    title: { type: String },
    links: { type: Array },
    valueArray: { type: Array },
    icon: { type: Array },
    iconValue: { type: Array }
  },
  { timestamps: true }
);

// defining a Customer model
var Footer = mongoose.model("footer", footer);
module.exports = Footer;
