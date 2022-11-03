var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const companyPerk = new Schema(
  {
    mainTitle: { type: String },
    title: { type: String },
    className: { type: String },
  },
  { timestamps: true }
);

// defining a Customer model
var CompanyPerk = mongoose.model("companyPerk", companyPerk);
module.exports = CompanyPerk;
