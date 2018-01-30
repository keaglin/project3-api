// all from passport lesson
// file for all logic related to passport.js

var LocalStrategy = require('passport-local').Strategy;
// require schema:
var User = require('../models/UserSchema');

// export all the functions
module.exports = function(passport) {
// serialize and deserialize session authentication (must be inside module.exports):
   passport.serializeUser(function(user, callback) {
       callback(null, user.id)
     })
   
     passport.deserializeUser(function(id, callback) {
       User.findById(id, function(err, user) {
           callback(err, user)
       })
    })
   // need to use passport.use + name
//****** must match in users.js */
   passport.use('local-signup', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     // tells it to pass request to another callback function:
     passReqToCallback : true
   }, function(req, email, password, callback) {
// inserted from lesson plan:

        // Find a user with this e-mail
   User.findOne({ 'local.email' :  email }, function(err, user) {
       if (err) return callback(err);
 
       // If there already is a user with this email
       if (user) {
     return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
       } else {

     // Create a new user
     var newUser            = new User();
     newUser.local.email    = email;
     // not saving password in database 
     newUser.local.password = newUser.encrypt(password);
 
     newUser.save(function(err) {
       if (err) throw err;
       return callback(null, newUser);
     });
       }
     });
   }));

/////

// create a new custom strategy for the login (also IN module.exports):
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      }, function(req, email, password, callback) {
          
/////    
         // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) {
          return callback(err);
        }
  
        // If no user is found
        if (!user) {
          return callback(null, false, req.flash('loginMessage', 'No user found.'));
        }
        // Wrong password
        if (!user.validPassword(password)) {
          return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
  
        return callback(null, user);
      });

      }));
 };

