<template>
  <v-layout column align-center>
    <img src="/v.png" alt="Vuetify.js" class="mb-5">
    <center>
      <p>{{data}}</p>
      <p>{{data.name}}</p>
      <p v-for="item in data.customValues">
        {{ item.displayName }}: {{ item.value }}
      </p>
    </center>
  </v-layout>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const data = await app.$axios.$get('/members/me')
    return { data: data }
  }
}
</script>
