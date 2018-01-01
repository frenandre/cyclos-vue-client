<template>
  <v-layout>
    <v-flex text-xs-center>
    <img src="/v.png" alt="Vuetify.js" class="mb-5">
    <p>
      <button @click="login('91392', '91392')">91392</button>
      &nbsp;
      <button @click="login('39967', '39967')">39967</button>
      &nbsp;
      <button @click="login('39966', '39966')">39966</button>
    </p>
    <v-form v-if="!$store.getters.isAuthenticated" @submit.prevent="login(formUsername, formPassword)">
    <v-text-field label="Username" v-model="formUsername" required/>
    <v-text-field label="Password" v-model="formPassword" type="password" required />
    <v-btn type="submit">Submit</v-btn>
  </v-form>
    <div v-if="$store.getters.isAuthenticated">
      <p>
        Welcome {{ $store.state.userdata.profile.name }}<br>
        <button @click="logout()">logout</button>
      </p>
      <p>{{ $store.state.userdata }}</p>
    </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    login: function (user, password) {
      this.$store.dispatch('login', btoa(user + ':' + password))
      this.$store.dispatch('authenticate')
    },
    logout: function () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
