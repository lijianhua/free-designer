import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import login from './modules/login'
import product from './modules/product'
import productDetail from './modules/productDetail'
import apply from './modules/apply'
import my from './modules/my'
import order from './modules/order'
import orderDetail from './modules/orderDetail'
import points from './modules/points'
import confirmedOrder from './modules/confirmedOrder'

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
    product,
    productDetail,
    apply,
    my,
    order,
    orderDetail,
    points,
    confirmedOrder
  }
})
