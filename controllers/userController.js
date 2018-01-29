const router = require('express').Router()
const User = require('../models/UserSchema')

// all from passport lesson

var passport = require("passport")
router.route('/signup')
.get(getSignup)
.post(postSignup)

router.route('/login')
.get(getLogin)
.post(postLogin)

router.route("/logout")
.get(getLogout)


// function for authenticated user:
function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/login');
}

// adds route for profile page IF user is authenticated:
router.route("/profile")
.get(authenticatedUser, profile)
// GET /signup
function getSignup(req, res, next) {
  res.render('signup.hbs', { message: req.flash('signupMessage') });
}

// POST /signup
function postSignup(req, res, next) {
  // local signup has to match the local signup in passport.use export: **********************
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(req, res, next);
}

// GET /login

function getLogin(req, res, next) {
  res.render('login.hbs', { message: req.flash('loginMessage') });
}

// POST /login (if verification was a success, allow entry):
function postLogin(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect('/');
}

// Restricted page
function profile(req, res){
  res.send("logged in");

}


module.exports = router
