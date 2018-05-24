const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  bookId: String,
  userName: String,
  userId: String,
}, {
  timestamps: true
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review
