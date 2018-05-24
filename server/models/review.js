const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  userName: String,
  userId: Number,
}, {
  timestamps: true
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review
