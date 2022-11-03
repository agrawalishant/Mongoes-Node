const Terms = require("../model/termsAndCondition_model");
var { ObjectID } = require("mongodb");

// var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var term = new Terms({
    title: req.body.title,
    description: req.body.description,
  });
  term.save().then(
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
    Terms.find().then(
    (term) => {
      res.status(200).send(term);
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
  Terms.findById(id)
    .then((term) => {
      if (!term) {
        return res.status(404).send();
      }
      res.status(200).send(term);
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
  Terms.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  )
    .then((term) => {
      if (!term) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({
        message: "your data successfully updated....",
        data: term,
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
  Terms.findByIdAndRemove(id)
    .then((term) => {
      if (!term) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
