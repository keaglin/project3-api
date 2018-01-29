const express = require('express')
const parser = require('body-parser')
const methodOverride = require('method-override')
const controller = require('./controllers/bookController')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

app.use(methodOverride('_method'))
app.use(parser.urlencoded({extended: true}))
app.use(parser.json({extended: false}))

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.redirect('/books')
})

app.use('/books', controller)

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'))
})
