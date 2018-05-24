const Book = require('../models/book.js')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  create: (req,res) => {
    let decoded = jwt.verify(req.headers.token, secret)
    let obj = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      img: req.file.cloudStoragePublicUrl,
      userName: decoded.username,
      userId: decoded.id,
      reviews: []
    }
    const newBook = new Book(obj)
    newBook.save()
      .then(book => {
        res.status(201).json({
          message: 'book created',
          data: book
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'server error'
        })
      })
  },
  read: (req,res) => {
    Book.find()
      .then(books => {
        res.status(200).json({
          message: 'this is all book data',
          data: books
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'server error'
        })
      })
  },
  findOne: (req,res) => {
    Book.findOne({
      _id: req.params.id
    })
      .populate('reviews')
      .then(books => {
        res.status(200).json({
          message: 'book by id',
          data: books
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  },
  readByAcc: (req,res) => {
    let decoded = jwt.verify(req.headers.token, secret)
    Book.find({
      userId: decoded.id
    })
      .then(books => {
        res.status(200).json({
          message: 'all data for acc',
          data: books
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'server error'
        })
      })
  },
  delete: (req,res) => {
    Book.findByIdAndRemove({
      _id: req.params.id
    })
    .then(book => {
      res.status(200).json({
        message: `book deleted`,
        data: book
      })
    })
    .catch(err => {
      res.status(500).json({
        message: `server error`
      })
    })
  }
}
