<template>
  <v-layout column align-center>
    <center>
      <p>{{data}}</p>
    </center>
  </v-layout>
</template>

<script>
export default {
  async asyncData ({ params, app }) {
    const data = await app.$axios.$get('/ads/' + params.id)
    return { data: data }
  }
}
</script>
