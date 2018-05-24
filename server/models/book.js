const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  publisher: String,
  img: String,
  userId: String,
  userName: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book
