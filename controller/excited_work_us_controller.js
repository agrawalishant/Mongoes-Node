const ExcitedWork = require("../model/excited_work_us_model");
var { ObjectID } = require("mongodb");

// var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var excitedWork = new ExcitedWork({
    title: req.body.title,
    description: req.body.description,
    profileName: req.body.profileName,
    experience: req.body.experience,
    location: req.body.location,
    content: req.body.content,
  });
  excitedWork.save().then(
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
    ExcitedWork.find().then(
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
    return res.status(404).send({message:"id not found"});
  }
  ExcitedWork.findById(id)
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
    return res.status(404).send({message:"id not found"});
  }
  ExcitedWork.findByIdAndUpdate(
    id,
    {
        title: req.body.title,
        description: req.body.description,
        profileName: req.body.profileName,
        experience: req.body.experience,
        location: req.body.location,
        content: req.body.content,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({
        message: "your data successfully updated....",
        data: result,
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
  ExcitedWork.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
