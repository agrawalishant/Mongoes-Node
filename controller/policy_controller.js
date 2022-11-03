const Policy = require("../model/policy_model");
var { ObjectID } = require("mongodb");

// var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var policy = new Policy({
    title: req.body.title,
    description: req.body.description,
  });
  policy.save().then(
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
    Policy.find().then(
    (policy) => {
      res.status(200).send(policy);
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
  Policy.findById(id)
    .then((policy) => {
      if (!policy) {
        return res.status(404).send();
      }
      res.status(200).send(policy);
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
  Policy.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  )
    .then((policy) => {
      if (!policy) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({
        message: "your data successfully updated....",
        data: policy,
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
  Policy.findByIdAndRemove(id)
    .then((policy) => {
      if (!policy) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
