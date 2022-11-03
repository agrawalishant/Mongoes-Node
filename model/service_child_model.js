var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ServicesSchema = new Schema({
   title: { type: String },
   description: { type: String },
   image: { type: String },
   alt:{type:String}
}, { timestamps: true })

// defining a Customer model
var ServicesChild = mongoose.model('ServiceChild', ServicesSchema);
module.exports = ServicesChild;