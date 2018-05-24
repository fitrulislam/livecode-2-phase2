const axios = require('axios')

module.exports = {
  auth: (req, res, next) => {
    axios.post('http://user-api.roarized.com/api/validateadmin', {}, {
      headers: {token: req.headers.token}
    })
      .then(response => {
        if (response.data.message === 'silahkan lanjut') {
          next()
        } else {
          res.status(404).json({
            message: 'please login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  }
}
