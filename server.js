const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const authRoute = require('./controller/admin_controller');

const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
var {db} = require("./config/db");
const multer = require('multer');

const app = express();
app.use(cors())


app.use('/services',express.static('services'));
app.use('/banner',express.static('banner'));
app.use('/about',express.static('about'));
app.use("/feature", express.static("feature"));
app.use("/technology", express.static("technology"));
app.use("/team", express.static("team"));
app.use("/testimonial",express.static("testimonial"));
app.use('/file',express.static('file'))
app.use("/career",express.static("career"));
app.use("/serviceChild",express.static('serviceChild'));
app.use("/lifeCycle",express.static('lifeCycle'));
app.use("/review",express.static('review'));
app.use("/logo",express.static("logo"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/api/auth', authRoute);


require('./routes/banner_routes')(app);
require('./routes/service_routes')(app);
require('./routes/about_routes')(app);
require('./routes/feature.routes')(app);
require('./routes/ourTechnolgy.routes')(app);
require('./routes/contactUs.routes')(app);
require('./routes/technology_expertise_routes')(app);
require('./routes/team_routs')(app);
require('./routes/innovative_team_routes')(app);
require('./routes/testimonial_routes')(app);
require("./routes/applyNow.routes")(app);
require("./routes/career_ourValue_routes")(app);
// require("./routes/career_excitedWork_routes")(app);
require("./routes/home_routes")(app);
require('./routes/serviceChild_routes')(app);
require("./routes/lifeCycle_routes")(app);
require('./routes/featuresChild.routes')(app);
require('./routes/technology_child_routes')(app)
require('./routes/review_routes')(app);
require('./routes/overview_routes')(app);
require('./routes/termsAndCondition_routes')(app);
require('./routes/navbar_routes')(app);
require('./routes/contact_footer_routes')(app);
require('./routes/policy_routes')(app);
require('./routes/footer_routes')(app);
require('./routes/excited_work_us_routes')(app);
require('./routes/copyright_routes')(app);
require('./routes/companyPerk_routes')(app);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("App is running on port " + port);
});

module.exports = {app};