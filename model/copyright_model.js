var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const copyRight = new Schema(
  {
    title: { type: String }
  },
  { timestamps: true }
);

// defining a Customer model
var CopyRight = mongoose.model("CopyRight", copyRight);
module.exports = CopyRight;
