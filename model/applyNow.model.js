var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ApplyNowSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    technology: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    upload: { type: String, required: true },
  },
  { timestamps: true }
);

var ApplyNow = mongoose.model("ApplyNow", ApplyNowSchema);
module.exports = ApplyNow;
