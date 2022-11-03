const Navbar = require("../model/navbar_model");
var { ObjectID } = require("mongodb");

var url = "https://therapidhiredev.herokuapp.com/";

exports.create = (req, res) => {
    var navbar = new Navbar({
        title: req.body.title,
        logo:`${url}${req.file.path}`
    });
    navbar.save().then(
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
    Navbar.find().then(
        (nav) => {
            res.status(200).send(nav);
        },
        (e) => {
            res.status(400).send({ message: e.message });
        }
    );
};

exports.findOne = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "id not found" });
    }
    Navbar.findById(id)
        .then((nav) => {
            if (!nav) {
                return res.status(404).send();
            }
            res.status(200).send(nav);
        })
        .catch((e) => {
            res.status(400).send({ message: e.message });
        });
};

exports.update = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "id not found" });
    }
    Navbar.findByIdAndUpdate(
        id,
        {
            title: req.body.title,
            logo:`${url}${req.file.path}`
        },
        { new: true }
    )
        .then((nav) => {
            if (!nav) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({
                message: "your data successfully updated....",
                data: nav,
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
    Navbar.findByIdAndRemove(id)
        .then((nav) => {
            if (!nav) {
                return res.status(404).send();
            }
            //   res.send(review);
            res.status(200).send({ message: "data deleted successfully..." });
        })
        .catch((e) => {
            res.status(400).send();
        });
};
