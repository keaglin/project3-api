const mongoose = require('mongoose')
const seedData = require('./seedData.json')

if (process.env.NODE_ENV == "production") {
    mongoose.connect(process.env.MLAB_URL)
  } else {
    mongoose.connect("mongodb://localhost/project3-api");
}


mongoose.Promise = Promise

module.exports = mongoose
