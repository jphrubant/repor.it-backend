const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user-model");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// POST '/auth/signup'
router.post('/signup', isNotLoggedIn, validationLogin, async (req, res, next) => {
  const { email, password, dateOfBirth, sex, sexualOrientation, ethnicity, nationality, reports} = req.body;
  try {																									 // projection
    const emailExists = await User.findOne({ email }, 'email');
    
    if (emailExists) return next(createError(400));
    else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
    
      const newUser = await User.create({ email, password: hashPass, dateOfBirth, sex, sexualOrientation, ethnicity, nationality, reports}); 
      newUser.password = "";
      req.session.currentUser = newUser;
      res
        .status(201)  
        .json(newUser);
        console.log(newUser);
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/login'
router.post('/login', isNotLoggedIn, validationLogin, async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email }) ;
    console.log('(password, user.password)', password, user);
    if (!user) {
      next(createError(404));
    } 
    else if (bcrypt.compareSync(password, user.password)) {
      user.password = "";
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
    } 
    else {
      next(createError(401));	// Unauthorized
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/logout'
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
});

// GET '/auth/me'
router.get('/me', isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
  .populate('reports')
  .then((currentUser)=>{
    currentUser.password = "";
    res
      .status(200)
      .json(currentUser);
  })
});

module.exports = router;
