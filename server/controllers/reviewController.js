const Review = require('../models/review.js')
const Book = require('../models/book.js')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  create: (req,res) => {
    let decoded = jwt.verify(req.headers.token, secret)
    let obj = {
      content: req.body.content,
      userId: decoded.id,
      userName: decoded.username,
    }
    const newReview = new Review(obj)
    newReview.save()
      .then(review => {
        Book.findOne({
          _id: req.body.bId
        })
          .then(book => {
            let reviews = book.reviews
            reviews.push(review._id)
            Book.update({
              _id: req.body.bId
            }, {
              reviews: reviews
            })
              .then(book => {
                res.status(201).json({
                  message: 'review created',
                  data: review
                })
              })
              .catch(err => {
                res.status(500).json({
                  message: 'something went wrong'
                })
              })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  },
  read: (req,res) => {
    Review.find()
      .then(reviews => {
        res.status(200).json({
          message: 'all review',
          data: reviews
        })
      })
      .catch(err => {
        res.status(404).json({
          message: 'review not found'
        })
      })
  },
  delete: (req,res) => {
    Review.findByIdAndRemove({
      _id: req.params.id
    })
    .then(review => {
      res.status(200).json({
        message: `review deleted`,
        data: review
      })
    })
    .catch(err => {
      res.status(500).json({
        message: `server error`
      })
    })
  }
}