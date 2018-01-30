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
  Book.find({
    title: req.params.title
  })
      .then((book) => {
        res.json(book)
        // console.log(book)
      })
      .catch((err) => {
        console.log(err)
      })
})

Router.get('/:author', (req, res) => {
  Book.find({
    author: req.params.author
  })
       .then((book) => {
         res.json(book)
       })
       .catch((err) => {
         console.log(err)
       })
})

Router.post('/:title', (req, res) => {
  Book.create(req.body.book)
         .then((book) => {
           res.redirect(`/books/${req.params.title}`)
         })
         .catch((err) => {
           console.log(err)
         })
})

Router.put('/:title', (req, res) => {
  Book.findOneAndUpdate({
    title: req.params.title
  }, req.body.book, {new: true})
      .then((book) => {
        res.redirect(`/books/` + req.params.title)
       })
      .catch((err) => {
        console.log(err)
      })

})

Router.delete('/:title', (req, res) => {
  Book.findOneAndRemove({
    title: req.params.title
  })
       .then(() => {
         res.redirect('/books')
       })
       .catch((err) => {
         console.log(err)
       })
})

module.exports = Router
