import {
  getOrderDetailApi,
  completeOrderApi
} from '@/api/order'

export default {
  namespaced: true,
  state: {
    orderDetail: {},
    applyDetail: {}
  },
  getters: {
    orderDetail: state => state.orderDetail,
    applyDetail: state => state.applyDetail
  },
  mutations: {
    SET_ORDER_DETAIL (state, v) {
      state.orderDetail = v
      state.applyDetail = v.apply_records[0]
    }
  },
  actions: {
    async getOrderDetail ({ commit }, id) {
      const { data } = await getOrderDetailApi(id)
      commit('SET_ORDER_DETAIL', data.data)
    },
    async submit ({ commit, state }) {
      const { id } = state.orderDetail
      const { data } = await completeOrderApi(id, {
        status: 0
      })
      console.log(data)
    }
  }
}
