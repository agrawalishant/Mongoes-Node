const CopyRight = require("../model/copyright_model");
var { ObjectID } = require("mongodb");

// var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var copyright = new CopyRight({
    title: req.body.title
  });
  copyright.save().then(
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
    CopyRight.find().then(
    (copyright) => {
      res.status(200).send(copyright);
    },
    (e) => {
      res.status(400).send({message:e.message});
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  CopyRight.findById(id)
    .then((copyright) => {
      if (!copyright) {
        return res.status(404).send();
      }
      res.status(200).send(copyright);
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  CopyRight.findByIdAndUpdate(
    id,
    {
      title: req.body.title
    },
    { new: true }
  )
    .then((copyright) => {
      if (!copyright) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({
        message: "your data successfully updated....",
        data: copyright,
      });
    })
    .catch((e) => {
      res.status(400).send({ message: e.message });
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  CopyRight.findByIdAndRemove(id)
    .then((copyright) => {
      if (!copyright) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
