<template>
<div>
    <v-data-table :headers="headers" :items="rest.elements" class="elevation-1" hide-actions>
      <template slot="items" slot-scope="props">
        <td><nuxt-link :to="'/ads/' + props.item.id">{{ props.item.id }}</nuxt-link></td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.category.name }}</td>
        <td v-html="props.item.description" />
        <td>{{ props.item.owner.name }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-3">
      <v-pagination v-model="currentPage" :length="pages" @input="fetchData"></v-pagination>
    </div>
</div>
</template>

<script>

const title = 'Anzeigen'

const headers = [
  { text: 'Id', sortable: false },
  { text: 'Titel', sortable: false },
  { text: 'Kategorie', sortable: false },
  { text: 'Beschreibung', sortable: false },
  { text: 'Mitglied', sortable: false }
]
const restUrl = '/ads?pageSize=4'

export default {
  async asyncData ({ app }) {
    return {
      rest: await app.$axios.$get(restUrl)
    }
  },
  data () {
    return {
      rest: null,
      headers: headers
    }
  },
  head: {
    title: title
  },
  meta: {
    title: title
  },
  methods: {
    async fetchData (page) {
      const data = await this.$axios.$get(restUrl + '&currentPage=' + (page - 1))
      this.rest = data
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.rest.totalCount / this.rest.pageSize)
    },
    currentPage () {
      return this.rest.currentPage + 1
    }
  }
}
</script>
