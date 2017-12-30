export default function ({ isServer, store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/')
  }
}
