import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    book: {}
  },
  mutations: {
    addBookFromDB (state, payload) {
      payload.forEach(book => {
        book.totalReview = book.reviews.length
      })
      for (let i = 1; i < payload.length; i++) {
        for (let j = 0; j <= i - 1; j++) {
          let front = payload[j]
          let back = payload[i]
          if (payload[i].totalReview > payload[j].totalReview) {
            payload[i] = front
            payload[j] = back
          }
        }
      }
      state.books = payload
    },
    addNewBook (state, payload) {
      state.books.push(payload)
    },
    addOneBookFromDB (state, payload) {
      for (let i = 1; i < payload.reviews.length; i++) {
        for (let j = 0; j <= i - 1; j++) {
          let front = payload.reviews[j]
          let back = payload.reviews[i]
          if (payload.reviews[i].createdAt > payload.reviews[j].createdAt) {
            payload.reviews[i] = front
            payload.reviews[j] = back
          }
        }
      }
      state.book = payload
    },
    addAnswer (state, payload) {
      state.book.reviews.unshift(payload)
    },
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('status')
    }
  },
  actions: {
    addBookFromDB ({commit}) {
      axios.get('http://localhost:3000/book/read')
        .then(response => {
          commit('addBookFromDB', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addOneBookFromDB ({commit}, payload) {
      axios.get(`http://localhost:3000/book/findone/${payload}`)
        .then(response => {
          commit('addOneBookFromDB', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
