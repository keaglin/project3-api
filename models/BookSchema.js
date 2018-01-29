const mongoose = require('../db/connection')

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    published: Number,
    quality: Number,
    quote: String,
    owner: String,
})

const Book = mongoose.model('Book', BookSchema)
module.exports = Book
