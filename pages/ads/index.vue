<template>
<div>
  <v-select label="Art" v-model="searchSelect" @input="fetchData(1)" :items="searchItems" item-text="name" item-value="id" />
  <v-select label="Kategorie" v-model="categorySelect" @input="fetchData(1)" :items="categoryItems" item-text="name" item-value="id" />
  <v-form @submit.prevent="fetchData(1)">
    <v-text-field label="Suchbegriff" value="aa" v-model="keyword" ref="keyword" class="input-group--focused" />
  </v-form>
  <v-data-table :headers="headers" :items="data.elements" class="elevation-1" hide-actions>
    <template slot="items" slot-scope="props">
      <td><nuxt-link :to="'/ads/' + props.item.id">{{ props.item.id }}</nuxt-link></td>
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.category.name }}</td>
      <td v-html="props.item.description" />
      <td>{{ props.item.owner.name }}</td>
    </template>
  </v-data-table>
  <div class="text-xs-center pt-3">
    <v-pagination :value="paginationPage" :length="paginationLength" @input="fetchData"></v-pagination>
  </div>
  <p>{{categoryItems}}</p>
</div>
</template>

<script>

const title = 'Anzeigen'
const dataUrl = '/ads?pageSize=4'
const headers = [
  { text: 'Id', sortable: false },
  { text: 'Titel', sortable: false },
  { text: 'Kategorie', sortable: false },
  { text: 'Beschreibung', sortable: false },
  { text: 'Mitglied', sortable: false }
]

function listCategries (items) {
  let list = function (items, level, result = null) {
    if (!result) {
      result = [{ id: null, name: 'Alle' }]
    }
    let indent = ''
    for (let i = 0; i < level; i++) {
      indent += '> '
    }
    items.forEach(function (item) {
      result.push({ id: item.id, name: indent + item.name })
      if (item.children) {
        list(item.children, level + 1, result)
      }
    })
    return result
  }
  return list(items, 0)
}

export default {
  data () {
    return {
      data: null,
      categoryItems: null,
      searchItems: [{ id: false, name: 'Angebote' }, { id: true, name: 'Anfragen' }],
      categorySelect: null,
      searchSelect: null,
      keyword: null,
      headers: headers
    }
  },
  async asyncData ({ app }) {
    return {
      data: await app.$axios.$get(dataUrl),
      categoryItems: listCategries(await app.$axios.$get('/adCategories'))
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
      let url = dataUrl + '&searching=' + this.searchSelect + '&currentPage=' + (page - 1)
      if (this.categorySelect) {
        url += '&categoryId=' + this.categorySelect
      }
      if (this.keyword) {
        url += '&keywords=' + encodeURIComponent(this.keyword)
      }
      this.data = await this.$axios.$get(url)
      this.$refs.keyword.focus()
    }
  },
  computed: {
    paginationPage () {
      return this.data.currentPage + 1
    },
    paginationLength () {
      return Math.ceil(this.data.totalCount / this.data.pageSize)
    }
  },
  mounted () {
    this.searchSelect = false
    this.$refs.keyword.focus()
  }
}
</script>
