import { getOrderDetail } from '@/api/orderDetail'

export default {
  namespaced: true,
  state: {
    orderDetail: {}
  },
  getters: {
    orderDetail: state => state.orderDetail
  },
  mutations: {
    GET_ORDERDETAIL (state, data) {
      state.orderDetail = data
    }
  },
  actions: {
    async getOrderDetail ({ commit }, orderId) {
      const { data } = await getOrderDetail(orderId)
      commit('GET_ORDERDETAIL', data)
    }
  }
}
