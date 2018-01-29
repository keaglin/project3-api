const mongoose = require('../controllers/controllers.js')
const seedData = require('./seedData.json')
const Book = require('../models/BookSchema')

Book.remove({})
.then(() => {
  return Book.collection.insert(seedData)
})
.then(() => {
  process.exit
})
