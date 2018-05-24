import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    addBookFromDB (state, payload) {
      state.books = payload
    },
    addNewBook (state, payload) {
      state.books.push(payload)
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
    }
  }
})
