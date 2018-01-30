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
    successRedirect : '/profile',
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
    successRedirect : '/profile',
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

// // Restricted page
// function profile(req, res){
//   res.json(User);
//   console.log(req.user)

// }

// Restricted page
function profile(req, res){
    router.get('/:id', (req, res) => {
        User.find({
          id: req.params.id
        })
             .then((user) => {
               res.json(user)
             })
             .catch((err) => {
               console.log(err)
             })
      })
 
  }

// user crud:

// update User: 
router.put('/:id', (req, res) => {
    User.findOneAndUpdate({
        id: req.params.id
      }, req.body.user, {new: true})
           .then((user) => {
             res.redirect(`/${user.id}`)
           })
           .catch((err) => {
             console.log(err)
           })
    })
    
// delete User
router.delete('/:id', (req, res) => {
    User.findOneAndRemove({
        id: req.params.id
    })
            .then(() => {
            res.redirect('/books')
            })
            .catch((err) => {
            console.log(err)
            })
    })

module.exports = router
