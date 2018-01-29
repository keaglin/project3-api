
const express = require('express')
const Router = express.Router()
const Book = require('../models/BookSchema')

Router.get('/', (req, res) => {
  Book.find({})
    .then((book) => {
      res.json(book)
    })
    .catch((err) => {
      console.log(err)
    })
})

Router.get('/:title', (req, res) => {
    Book.find({title: req.params.title})
    .then((book) => {
        res.json(book)
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = Router
