const Review = require("../model/review_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var review = new Review({
    title: req.body.title,
    image: `${url}${req.file.path}`,
    description: req.body.description,
  });
  review.save().then(
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
  Review.find().then(
    (review) => {
      res.status(200).send(review);
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
  Review.findById(id)
    .then((review) => {
      if (!review) {
        return res.status(404).send();
      }
      res.status(200).send(review);
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
  Review.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      image: `${url}${req.file.path}`,
      description: req.body.description,
    },
    { new: true }
  )
    .then((review) => {
      if (!review) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({
        message: "your data successfully updated....",
        data: review,
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
  Review.findByIdAndRemove(id)
    .then((review) => {
      if (!review) {
        return res.status(404).send();
      }
      //   res.send(review);
      res.status(200).send({ message: "data deleted successfully..." });
    })
    .catch((e) => {
      res.status(400).send();
    });
};
