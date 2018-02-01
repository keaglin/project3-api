const mongoose = require('../controllers/recordController.js')
const seedData = require('./recordSeeds.json')
const Record = require('../models/RecordSchema')

Record.remove({})
.then(() => {
  return Record.collection.insert(seedData)
})
.then(() => {
  process.exit
})
