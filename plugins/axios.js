export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.auth) {
      config.headers.common['Authorization'] = 'Basic ' + store.state.auth
    }
  })
}
