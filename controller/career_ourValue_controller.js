const CareerOurValue = require("../model/career_ourValue_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
    var careerObj = new CareerOurValue({
        mainTitle: req.body.mainTitle,
        description: req.body.description,
        image: `${url}${req.file.path}`,
        alt: req.body.alt,
        title: req.body.title,
        body: req.body.body 
    });
    careerObj.save().then(
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
    CareerOurValue.find().then(
        (CareerOurValue) => {
            res.status(200).send(CareerOurValue);
        },
        (e) => {
            res.status(400).send(e);
        }
    );
};

exports.findOne = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: 'id not found...' });
    }
    CareerOurValue.findById(id)
        .then((CareerOurValue) => {
            if (!CareerOurValue) {
                return res.status(404).send();
            }
            res.status(200).send(CareerOurValue);
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
        return res.status(404).send({ message: 'id not found...' });
    }
    CareerOurValue.findByIdAndUpdate(
        id,
        {
            mainTitle: req.body.mainTitle,
            description: req.body.description,
            image: `${url}${req.file.path}`,
            alt: req.body.alt,
            title: req.body.title,
            body: req.body.body 
        },
        { new: true }
    )
        .then((CareerOurValue) => {
            res.status(200).send(CareerOurValue);
        })
        .catch((e) => {
            res.status(400).send({ message: 'data deleted successfully...' });
        });
};

exports.delete = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "id not found" });
    }
    CareerOurValue.findByIdAndRemove(id)
        .then((CareerOurValue) => {
            if (!CareerOurValue) {
                return res.status(404).send();
            }
            res.status(200).send({ message: 'data deleted successfully...' });
        })
        .catch((e) => {
            res.status(400).send({ message: e.message });
        });
};
