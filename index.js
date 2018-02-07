const express = require('express')
const parser = require('body-parser')
const methodOverride = require('method-override') // methodOverride is never used

// Try to keep your naming conventions consistent. (e.g. userController starts lowercase but RecordController starts uppercase, and 'controller' isn't semantically clear)
const controller = require('./controllers/bookController')
const RecordController = require('./controllers/recordController')
const userController = require('./controllers/userController.js')

const app = express()
const mongoose = require('mongoose') // you never use mongoose in this file
const cors = require('cors')
const handlebars = require('express-handlebars')
// Passport files:
const passport = require('passport')
const flash = require('flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(parser.urlencoded({extended: true}))
app.use(parser.json({extended: false}))
// use session encryption:
app.use(session({
  secret: 'WDI-PROJECT-3',
  resave: true,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./configs/passport')(passport)

require('./configs/passport')(passport)

app.set('port', process.env.PORT || 3000)

// set hbs views to test user auth pages:
app.set('view engine', 'handlebars')
app.engine('.hbs', handlebars({
  extname: '.hbs',
  partialsDir: './views/',
  layoutsDir: './views',
  defaultLayout: 'layout'
}))

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.get('/', (req, res) => {
  res.redirect('/books')
})

app.use('/books', controller)
app.use('/records', RecordController)
app.use('/', userController)

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'))
})
