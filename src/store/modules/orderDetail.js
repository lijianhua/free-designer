import { getOrderDetail, getOrderQusetion, setOrderAnswer, acceptOrder } from '@/api/orderDetail'

export default {
  namespaced: true,
  state: {
    orderDetail: {},
    questionList: []
  },
  getters: {
    orderDetail: state => state.orderDetail,
    questionList: state => state.questionList
  },
  mutations: {
    GET_ORDERDETAIL (state, data) {
      state.orderDetail = data
    },
    GET_QUESTION (state, data) {
      state.questionList = data.data
    }
  },
  actions: {
    async getOrderDetail ({ commit }, orderId) {
      const { data } = await getOrderDetail(orderId)
      commit('GET_ORDERDETAIL', data)
    },
    async getOrderQusetion ({ commit }, orderId) {
      const { data } = await getOrderQusetion(orderId)
      commit('GET_QUESTION', data)
    },
    async setOrderAnswer ({ commit }, dataForm) {
      await setOrderAnswer(dataForm)
    },
    async acceptOrder ({ commit }, dataForm) {
      await acceptOrder(dataForm)
    }
  }
}
