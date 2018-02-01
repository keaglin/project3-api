const express = require('express')
const Router = express.Router()
const Record = require('../models/RecordSchema')

Router.get('/', (req, res) => {
  Record.find({})
   .then((record) => {
     res.json(record)
   })
   .catch((err) => {
     console.log(err)
   })
})

Router.get('/:name', (req, res) => {
  Record.find({
    name: req.params.name
  })
      .then((record) => {
        res.json(record)
        // console.log(record)
      })
      .catch((err) => {
        console.log(err)
      })
})

Router.get('/:artist', (req, res) => {
  Record.find({
    artist: req.params.artist
  })
       .then((record) => {
         res.json(record)
       })
       .catch((err) => {
         console.log(err)
       })
})

Router.post('/:name', (req, res) => {
  Record.create(req.body.record)
         .then((record) => {
           res.redirect(`/records/${record.name}`)
         })
         .catch((err) => {
           console.log(err)
         })
})

Router.put('/:name', (req, res) => {
  Record.findOneAndUpdate({
    name: req.params.name
  }, req.body.record, {new: true})
       .then((record) => {
         res.redirect(`/records/${record.name}`)
       })
       .catch((err) => {
         console.log(err)
       })
})

Router.delete('/:name', (req, res) => {
  Record.findOneAndRemove({
    name: req.params.name
  })
       .then(() => {
         res.redirect('/records')
       })
       .catch((err) => {
         console.log(err)
       })
})

module.exports = Router