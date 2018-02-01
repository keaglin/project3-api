const mongoose = require('../db/connection')

const RecordSchema = new mongoose.Schema({
    name: String,
    artist: String,
    released: Number,
    quality: Number,
    song: String,
    owner: String,
    imageUrl: String
})

const Record = mongoose.model('Record', RecordSchema)
module.exports = Record
