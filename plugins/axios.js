export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    if (store.state.auth) {
      config.headers.common['Authorization'] = 'Basic ' + store.state.auth
    }
  })
}
