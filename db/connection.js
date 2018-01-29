const mongoose = require('mongoose')
const seedData = require('./seedData.json')

mongoose.connect("mongodb://localhost/project3-api");

mongoose.Promise = Promise

module.exports = mongoose
