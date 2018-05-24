<template>
  <v-app light>
    <v-toolbar color="silve" flat fixed app>
      <v-icon>fas fa-book</v-icon>
      <v-toolbar-title class="back" @click="backToHome">Book RView</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="status == false" flat @click="toLogin">Sign In</v-btn>
      <v-btn v-show="status == true" flat>My Book</v-btn>
      <v-btn v-show="status == true" flat @click="signout">Sign Out</v-btn>
    </v-toolbar>
    <v-content>
      <v-layout column wrap>
        <v-container>
          <v-layout wrap align-center>
            <img :src="book.img" alt="image" style="max-width: 300px;">
            <v-list-tile-title><h3>Title: {{ book.title }}</h3></v-list-tile-title>
            <v-list-tile-sub-title><h4>Author: {{ book.author }}</h4></v-list-tile-sub-title>
            <v-list-tile-sub-title><h4>Publisher: {{ book.publisher }}</h4></v-list-tile-sub-title>
            <v-btn small color="error" @click.stop="dialog = true">Delete this book</v-btn>
            <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                  <v-card-text>
                    <h2>You are not owner of this book</h2>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="danger" flat @click.stop="dialog2 = false">close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-text>
                    <h2>DELETE THIS BOOK?</h2>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="danger" flat @click.stop="dialog = false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="deleteBook(book._id)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <v-dialog v-model="dialog3" max-width="500px">
                <v-card>
                  <v-card-text>
                    <h2>You just can give 1 review</h2>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="danger" flat @click.stop="dialog3 = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </v-layout>
        </v-container>
        <v-container>
          <h3>Reviews</h3>
          <div v-for="(review, index) in book.reviews" :key="index">
            <v-layout row wrap align-center>
              <h4>{{ review.content }} - {{ review.userName }}</h4>
            </v-layout>
          </div>
          <v-form>
            <v-text-field
              label="add review"
              multi-line
              v-model="review">
            </v-text-field>
            <v-btn small color="danger" @click="addReview(book._id)">Add Review</v-btn>
          </v-form>
        </v-container>
      </v-layout>
    </v-content>>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'bookdetail',
  data () {
    return {
      review: '',
      dialog: false,
      dialog2: false,
      dialog3: false,
      status: false,
      statusDelete: false
    }
  },
  props: ['id'],
  computed: {
    book () {
      return this.$store.state.book
    }
  },
  methods: {
    deleteBook (id) {
      axios.delete(`http://localhost:3000/book/delete/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.dialog = false
          this.dialog2 = true
        })
    },
    addReview (id) {
      axios.post('http://localhost:3000/review/create', {
        bId: id,
        content: this.review
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.commit('addAnswer', response.data.data)
          this.review = ''
        })
        .catch(err => {
          console.log(err)
          this.dialog3 = true
          this.review = ''
        })
    },
    backToHome () {
      this.$router.push('/')
    },
    toLogin () {
      this.$router.push('/signin')
    },
    signout () {
      this.$store.commit('signout')
    }
  },
  created: function () {
    this.$store.dispatch('addOneBookFromDB', this.id)
    let status = localStorage.getItem('status')
    if (status === 'connected') {
      this.status = true
    }
  }
}
</script>

<style scoped>
.arrow-up {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;

  border-bottom: 15px solid grey;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;

  border-top: 15px solid grey;
}

.nav-link {
  color: white !important;
  font-weight: bold;
}

.navbar {
  margin-bottom: 15px;
}

.main-container{
  display:flex;
  flex-direction:row;
  padding-bottom: 10px;
}

.left{

  min-width:80px;
  max-width:80px;
}
</style>
