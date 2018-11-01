import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import login from './modules/login'
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_USER_INFO (state, v) {
      state.userInfo = v
    }
  },
  modules: {
    home,
    login,
    product
  }
})
