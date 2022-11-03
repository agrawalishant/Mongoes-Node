const ContactUs = require("../model/contactUs.model");
var { ObjectID } = require("mongodb");
const multiparty = require("multiparty");

exports.create = (req, res) => {
  var contactus = new ContactUs({
    email: req.body.email,
    message: req.body.message,
    name: req.body.name,
  });
  contactus.save().then((docs) => {
    var transporter = nodemailer.createTransport({
      host: "mail.therapidhire.com", //replace with your email provider
      secureConnection: false,
            tls: {
              rejectUnauthorized: false
            },
      port: 587,
      auth: {
        user: "sales@therapidhire.com",
        pass: "#Equifax2014",
      },
    });
    var mailOptions = {
      from: docs.email,
      to: "sales@therapidhire.com",
      subject: "Website Enquiry",
      text:
        "Name:-" +
        docs.name +
        "\n Email:- " +
        docs.email +
        "\n Message:-" +
        docs.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).send("Email not sent");
      } else {
        res.status(200).send("Email sent successfully");
      }
    });
  });
  var nodemailer = require("nodemailer");
};

exports.findAll = (req, res) => {
  ContactUs.find().then(
    (contactUs) => {
      res.status(200).send(contactUs);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ContactUs.findById(id)
    .then((contactUs) => {
      if (!contactUs) {
        return res.status(404).send();
      }
      res.status(200).send(contactUs);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.update = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ContactUs.findByIdAndUpdate(
    id,
    {
      message: req.body.message,
      email: req.body.email,
      name: req.body.name,
    },
    { new: true }
  )
    .then((contactUs) => {
      console.log(contactUs);
      if (!contactUs) {
        return res.status(404).send();
      }
      //   res.send(contactUs);
      res.status(200).send({
        message: "your data successfully updated....",
        data: contactUs,
      });
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ContactUs.findByIdAndRemove(id)
    .then((contactUs) => {
      if (!contactUs) {
        return res.status(404).send();
      }
      //   res.send(contactUs);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
