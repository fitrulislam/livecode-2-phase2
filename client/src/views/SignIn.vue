<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <span v-if="status == false">Wrong Username/Password</span>
              <v-toolbar color="silver">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <router-link to="/">Back To Home</router-link>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    label="username"
                    type="text"
                    v-model="username"
                    required>
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    label="password"
                    v-model="password"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    required>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="silver" block :disabled="allOk" @click="signin">Login</v-btn>
              </v-card-actions>
              <v-card-actions>
                <p class="text-xs-center" align-content-center>Don't have account yet? <router-link to="/signup">Sign Up</router-link> now!</p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'signin',
  data () {
    return {
      username: '',
      password: '',
      usernameStatus: false,
      passwordStatus: false,
      status: true,
      e1: true
    }
  },
  watch: {
    username: function (val) {
      if (this.username.length > 0) {
        this.usernameStatus = true
      } else {
        this.usernameStatus = false
      }
    },
    password: function (val) {
      if (this.password.length > 0) {
        this.passwordStatus = true
      } else {
        this.passwordStatus = false
      }
    }
  },
  computed: {
    allOk: function () {
      if (this.usernameStatus === true && this.passwordStatus === true) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    signin () {
      this.$http.post('https://user-api.roarized.com/api/signin', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('status', 'connected')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.status = false
          this.username = ''
          this.password = ''
          this.usernameStatus = false
          this.passwordStatus = false
        })
    }
  }
}
</script>

<style scoped>
</style>
