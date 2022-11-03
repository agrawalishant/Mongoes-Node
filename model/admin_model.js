const mongoose = require('mongoose');
var validator = require('validator');

const model = mongoose.Schema({
  userName:{type:String,required:true},
  email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: `{VALUE} is not a valid email`
        }
    },

     password: {
        type: String,
        required: true
      },
      roleName:{type:String}
    });

module.exports = new mongoose.model("User", model)