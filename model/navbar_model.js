var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const navbar = new Schema(
  {
    title: { type: String },
    logo:{type:String}
  },
  { timestamps: true }
);

// defining a Customer model
var Navbar = mongoose.model("navbar", navbar);
module.exports = Navbar;
