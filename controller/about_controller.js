const About = require('../model/about_model');
var { ObjectID } = require('mongodb');
var url = `https://therapidhiredev.herokuapp.com/`;

exports.create = (req, res) => {
    console.log("----", req.file)
    var about = new About({
        mainTitle: req.body.mainTitle,
        title: req.body.title,
        image: `${url}${req.file.path}`,
        description: req.body.description,
        alt: req.body.alt,
    });
    console.log(req.body)
    about.save().then((doc) => {
        (doc.isNew === false)
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).json({ success: false, message: e.message })
    });
};

exports.findAll = (req, res) => {
    About.find()
        .then((about) => {
            res.status(200).send(about);
        }, (e) => {
            res.status(500).send({message:e.message});
        })
};

exports.findOne = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    About.findById(id)
        .then((about) => {
            if (!about) {
                return res.status(404).send();
            }
            res.status(200).send(about);
        }).catch((e) => {
            res.status(500).send({message:e.message});
        });
};


exports.delete = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    About.findByIdAndRemove(id).then((about) => {
        if (!about) {
            return res.status(404).send();
        }
        res.status(200).send({ message: "data deleted successfully..." });
    }).catch((e) => {
        res.status(400).send();
    });
};

exports.update = (req, res) => {
    var bannerObj = {
        mainTitle: req.body.mainTitle,
        title: req.body.title,
        image: `${url}${req.file.path}`,
        description: req.body.description,
        alt: req.body.alt,
    }
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "Id Not Found" });
    }
    About.findByIdAndUpdate(id, bannerObj, { new: true })
        .then((about) => {
            res.status(200).send({ message: "your data successfully updated....", data: about });
        }).catch((e) => {
            res.status(400).send({ message: e.message });
        })
};
