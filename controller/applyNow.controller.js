const url = require("url");
// const ContactUs = require("../models/contactUs");
var { ObjectID } = require("mongodb");
const multiparty = require("multiparty");
const ApplyNow = require("../model/applyNow.model");
const { parse } = require("dotenv");
var request = require("request").defaults({ encoding: null });

var urls = `https://therapidhiredev.herokuapp.com/`;

exports.create = (req, res) => {
  var applyNow = new ApplyNow({
    name: req.body.name,
    description: req.body.description,
    technology: req.body.technology,
    email: req.body.email,
    phone_number: req.body.phone_number,
    upload: `${urls}${req.file.path}`,
  });
  applyNow.save().then((docs) => {
    var transporter = nodemailer.createTransport({
      host: "mail.therapidhire.com",
      secureConnection: false,
            tls: {
              rejectUnauthorized: false
            },
      port: 587,
      auth: {
        user: "career@therapidhire.com",
        pass: "#Equifax2014",
      },
    });
    var url = new URL(`https://therapidhiredev.herokuapp.com/${docs.upload}`);
    var mailOptions = {
      from: docs.email,
      to: "career@therapidhire.com",
      subject: "Website Enquiry",
      text:
        "Hello! I'm " +
        docs.name +
        "\n I would like to talk about " +
        docs.message +
        "\n You Can reach me at " +
        docs.email +
        "\n and " +
        docs.phone_number +
        "\n to chat and discuss next steps." +
        "\n I have an attachment and would love for you to take a look at it \n" +
        "RESUME =\n" +
        `${url}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).send("Email not sent");
      } else {
        res.status(200).send("Email sent SucessFully: " + info.response);
      }
    });
  });
  var nodemailer = require("nodemailer");
};

exports.findAll = (req, res) => {
  ApplyNow.find().then(
    (applyNow) => {
      res.status(200).send(applyNow);
    },
    (e) => {
      res.status(500).send(e);
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ApplyNow.findById(id)
    .then((applyNow) => {
      if (!applyNow) {
        return res.status(404).send();
      }
      res.status(200).send(careerform);
    })
    .catch((e) => {
      res.status(500).send();
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ApplyNow.findByIdAndRemove(id)
    .then((applyNow) => {
      if (!applyNow) {
        return res.status(404).send();
      }
      // res.send(careerform);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
