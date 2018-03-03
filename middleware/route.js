export default function ({ store, redirect, req, route }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/')
  }
  store.commit('setPageTitle', route.meta[0].title)
}
