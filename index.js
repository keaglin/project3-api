const express          = require('express')
const parser           = require('body-parser')
const methodOverride   = require('method-override')
const controller       = require('./controllers/bookController')
const RecordController = require('./controllers/recordController')
const app              = express()
const mongoose         = require('mongoose')
const cors             = require('cors')
const handlebars       = require('express-handlebars')
// Passport files:
const passport       = require('passport')
const flash          = require('flash')
const morgan         = require('morgan')
const cookieParser   = require('cookie-parser')
const session        = require('express-session')
const userController = require('./controllers/userController.js')

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
// use session encryption:
app.use(session({ 
    secret: 'WDI-PROJECT-3',
    resave: true,
    saveUninitialized: false
 }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./configs/passport')(passport);


app.use(methodOverride('_method'))
app.use(parser.urlencoded({extended: true}))
app.use(parser.json({extended: false}))

app.set('port', process.env.PORT || 3000)

//set hbs views to test user auth pages:
app.set('view engine', 'handlebars')
app.engine('.hbs', handlebars({
    extname: '.hbs',
    partialsDir: './views/',
    layoutsDir: './views',
    defaultLayout: 'layout' 
}))

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

app.get('/', (req, res) => {
  res.redirect('/books')
})

app.use('/books', controller)
app.use('/records', RecordController)
app.use('/', userController)

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'))
})
