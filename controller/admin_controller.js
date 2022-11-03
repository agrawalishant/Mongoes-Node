const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const express = require("express");
const User = require("../model/admin_model");
const router = express.Router();
var crypto = require('crypto');
const sendEmail = require("../mailHelper");
const { request } = require("http");


// router.post("/signup", (req, res) => {
//     const body = req.body;
//     console.log(body)
//     if (!(body.email && body.password)) {
//         return res.status(400).send({ error: "Data not formatted properly" });
//     }
//     const user = new User(body);
//     var crypto = require('crypto');
//     user.password = crypto.createHash('md5').update(user.password).digest('hex');
//     console.log(user.password);

//     // const user = new User(body);
//     // const salt = bcrypt.genSalt(10);
//     // user.password = bcrypt.hash(user.password, salt);
//     user.save().then((doc) =>
//         res.status(200).send(doc));
// });

// router.post("/login", async(req, res) => {
//     const body = req.body;
//     const user = await User.findOne({ email: body.email });
//     console.log(user)
//     if (user) {
//         const validPassword = await bcrypt.compareSync(body.password, user.password);
//         console.log(validPassword)
//         if (validPassword) {
//             res.status(200).json({ message: "login successfully .."});
//         } else {
//             res.status(401).json({ error: "Invalid Password" });
//         }
//     } else {
//         res.status(401).json({ error: "User does not exist" });
//     }
// });


router.post("/signup", async (req, res) => {
    const body = req.body;
    try {
      const {userName, email, password,roleName } = req.body;
      if (!(email && password && userName && roleName)) {
        res.status(400).send("All input is required....");
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login...");
      }
      const user = new User(body);
      user.password = await bcrypt.hash(password, 10);
      user.save().then(doc=>{
        res.status(200).json(doc);
      })
    } catch (err) {
      console.log(err);
    }
  });




  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
         if (!(email && password)) {
        res.status(400).send("All input is required....");
      }
         const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials...");
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/forgetPassword' ,async(req,res)=>{
    try{
      const{email} = req.body;
      if(!email){
        res.status(400).send("email shuld be required");
      }
      const user= await User.findOne({email});
      if(!user){
        res.status(400).send("user does not exist with this mail");
      }
      var bash_url = req.get('host');
      var portocol =  req.protocol;
      var link = `http://localhost:3000/reset`;
      console.log(link);
      await sendEmail(email,"Reset Password ", link);
      res.status(200).send("mail has been send succsfully");
   
    }catch(error){
      res.status(400).send(error.message);
    }
  });

  router.put('/updatePassword' , async(req,res)=>{
    const{email , password , conformPassword} = req.body;
    if(!(email && password && conformPassword)){
      res.status(400).send("parameter should not be empty");
    }
    if(password != conformPassword){
      res.status(400).send("password and conform password is not matched");

     }
     const newPassword =await bcrypt.hash(conformPassword,10);
    const user = await User.findOne({email});
    console.log(newPassword);

    if(!user){
      res.status(400).send("user does not exist");
    }else{
      await User.findByIdAndUpdate(user.id ,{password : newPassword}, {new:true});
      res.status(200).send("password updated");
    }

  })

module.exports = router;