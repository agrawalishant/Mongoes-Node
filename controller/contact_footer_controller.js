const ContactFooter = require("../model/contact_footer_model");
var { ObjectID } = require("mongodb");
const { result } = require("lodash");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var contactFooter = new ContactFooter({
    title: req.body.title,
    image: `${url}${req.file.path}`
  });
  contactFooter.save().then(
    (doc) => {
      doc.isNew === false;
      res.status(200).send(doc);
    },
    (e) => {
      res.status(400).json({ success: false, message: e.message });
    }
  );
};

exports.findAll = (req, res) => {
    ContactFooter.find().then(
    (result) => {
      res.status(200).send(result);
    },
    (e) => {
      res.status(400).send({message:e.message});
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  ContactFooter.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  ContactFooter.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: `${url}${req.file.path}`
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({message:'data updated successfully...',data:result});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  ContactFooter.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.status(200).send({message:'data deleted successfully...'});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
