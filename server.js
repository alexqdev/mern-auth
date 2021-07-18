const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const path = require('path');
const port = process.env.PORT || 3001;
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect('mongodb+srv://dbNodeProject:dbpass001@restapidb.tp9t3.mongodb.net/UserDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, console.log('Database connected...'))


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("User Doesn't Exist");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        // res.send(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        food: req.body.food,
        color: req.body.color,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//Start Server
app.listen(port, () => {
  console.log("Server Started...");
});