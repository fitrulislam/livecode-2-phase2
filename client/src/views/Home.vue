<template>
  <v-app light>
    <v-toolbar color="silver" fixed app>
      <v-icon>fas fa-book</v-icon>
      <v-toolbar-title class="back" @click="backToHome">Book RView</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="status == false" flat color="black" @click="toLogin">Sign In</v-btn>
      <v-btn v-show="status == true" flat color="black" @click.stop="dialog = true">Add Book</v-btn>
      <v-btn v-show="status == true" flat color="black">My Book</v-btn>
      <v-btn v-show="status == true" flat color="black" @click="signout">Sign Out</v-btn>
    </v-toolbar>
    <v-content>
      <v-flex>
        <v-list two-line>
          <h2>&nbsp;&nbsp;&nbsp;Book List</h2>
          <div v-for="(book, index) in books" :key="index">
            <router-link :to="{ name: 'bookdetail', params: {id: book._id} }" style="color: black;">
              <v-list-tile @click="tes">
                <v-list-tile-avatar>
                  <img :src="book.img">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ book.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>Author: {{ book.author }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Publisher: {{ book.publisher }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </router-link>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-flex>
    </v-content>>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <template><v-progress-linear :indeterminate="upload"></v-progress-linear></template>
          <v-card-title>
            Add New Book
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="title"
                type="text"
                v-model="title"
                required>
              </v-text-field>
              <v-text-field
                label="author"
                type="text"
                v-model="author"
                required>
              </v-text-field>
              <v-text-field
                label="publisher"
                v-model="publisher"
                type="text"
                required>
              </v-text-field>
              <input type="file" @change="getFile">
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="danger" flat @click.stop="dialog = false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="addData">Add Book</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      title: '',
      author: '',
      publisher: '',
      file: null,
      titleStatus: false,
      publisherStatus: false,
      authorStatus: false,
      fileStatus: false,
      status: false,
      dialog: false,
      upload: false
    }
  },
  watch: {
    title: function (val) {
      if (val.length > 0) {
        this.titleStatus = true
      }
    },
    author: function (val) {
      if (val.length > 0) {
        this.authorStatus = true
      }
    },
    publisher: function (val) {
      if (val.length > 0) {
        this.publisherStatus = true
      }
    },
    file: function (val) {
      if (val !== null) {
        this.fileStatus = true
      }
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    allOk () {
      if (this.titleStatus === true && this.authorStatus === true && this.publisherStatus === true && this.fileStatus === true) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getFile (event) {
      this.file = event.target.files[0]
    },
    addData () {
      this.upload = true
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('author', this.author)
      formData.append('publisher', this.publisher)
      formData.append('image', this.file)
      this.$http.post('http://localhost:3000/book/create', formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.commit('addNewBook', response.data.data)
          this.upload = false
          this.title = ''
          this.author = ''
          this.publisher = ''
          this.dialog = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    tes () {
    },
    backToHome () {
      this.$router.push('/')
    },
    toLogin () {
      this.$router.push('/signin')
    },
    signout () {
      this.$store.commit('signout')
      this.status = false
    }
  },
  created: function () {
    this.$store.dispatch('addBookFromDB')
    let status = localStorage.getItem('status')
    if (status === 'connected') {
      this.status = true
    }
  }
}
</script>

<style>
.back:hover {
  cursor: pointer;
}
</style>
