var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AboutSchema = new Schema({
    mainTitle: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    alt: { type: String }
}, { timestamps: true })

// defining a Customer model
var About = mongoose.model('About', AboutSchema);
module.exports = About;