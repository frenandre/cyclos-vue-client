import * as Cookies from 'js-cookie'

export const state = () => ({
  auth: null,
  userdata: null
})

export const mutations = {
  SET_USER (state, auth) {
    state.auth = auth
  },
  SET_USERDATA (state, data) {
    console.log('authenticated')
    state.userdata = data
    Cookies.set('auth', state.auth, { expires: 7 })
  },
  CLEAR_USER (state) {
    state.auth = null
    state.userdata = null
    Cookies.remove('auth')
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.userdata != null
  }
}

export const actions = {
  logout ({ commit }) {
    commit('CLEAR_USER')
  },
  login ({ commit }, auth) {
    commit('SET_USER', auth)
  },
  async authenticate ({ commit, getters }) {
    try {
      let data = await this.$axios.$get('/access/initialData')
      commit('SET_USERDATA', data)
    } catch (e) {
      commit('CLEAR_USER')
    }
  },
  async nuxtServerInit ({ commit }, { req }) {
    try {
      const cookie = require('cookie')
      const auth = cookie.parse(req.headers.cookie)['auth']
      if (auth != null) {
        commit('SET_USER', auth)
        const options = { method: 'GET', url: '/access/initialData', headers: { 'Authorization': 'Basic ' + auth } }
        const response = await this.$axios(options)
        commit('SET_USERDATA', response.data)
      }
    } catch (e) {
      commit('CLEAR_USER')
    }
  }
}
