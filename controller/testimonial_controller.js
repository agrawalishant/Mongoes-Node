const Testimonial = require("../model/testimonial_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
  var testimonial = new Testimonial({
    title: req.body.title,
    mainDescription: req.body.mainDescription,
    image: `${url}${req.file.path}`,
    alt: req.body.alt,
    name: req.body.name,
    designation: req.body.designation,
    body: req.body.body,
    rating: req.body.rating,
  });
  testimonial.save().then(
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
    Testimonial.find().then(
    (testimonial) => {
      res.status(200).send(testimonial);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.findOne = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  Testimonial.findById(id)
    .then((testimonial) => {
      if (!testimonial) {
        return res.status(404).send();
      }
      res.status(200).send(testimonial);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.update = (req, res) => {
  var id = req.params.id;
  // const navbar = new Navbar
  // var body = _.pick(req.body);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:'id not found...'});
  }
  Testimonial.findByIdAndUpdate(
    id,
    {
        title: req.body.title,
        mainDescription: req.body.mainDescription,
        image: `${url}${req.file.path}`,
        alt: req.body.alt,
        name: req.body.name,
        designation: req.body.designation,
        body: req.body.body,
        rating: req.body.rating
    },
    { new: true }
  )
    .then((testimonial) => {
      res.status(200).send(testimonial);
    })
    .catch((e) => {
      res.status(400).send({message:'data deleted successfully...'});
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message:"id not found"});
  }
  Testimonial.findByIdAndRemove(id)
    .then((testimonial) => {
      if (!testimonial) {
        return res.status(404).send();
      }
      res.status(200).send({message:'data deleted successfully...'});
    })
    .catch((e) => {
      res.status(400).send({message:e.message});
    });
};
