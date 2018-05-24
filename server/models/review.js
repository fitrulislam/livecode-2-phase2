const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Book = require('./book')

const reviewSchema = new Schema({
  content: String,
  bookId: String,
  userName: String,
  userId: String,
}, {
  timestamps: true
})

let Review = mongoose.model('Review', reviewSchema)

// reviewSchema.post('findByIdAndRemove', function (next) {
//   Book.find()
// })

module.exports = Review
