import { getOrderDetail, getOrderQusetion, setOrderAnswer, acceptOrder } from '@/api/orderDetail'
import { getUserQusetion } from '@/api/order'
export default {
  namespaced: true,
  state: {
    orderDetail: {},
    questionList: [],
    userQuestionList: []
  },
  getters: {
    orderDetail: state => state.orderDetail,
    questionList: state => state.questionList,
    userQuestionList: state => state.userQuestionList
  },
  mutations: {
    GET_ORDERDETAIL (state, data) {
      state.orderDetail = data
    },
    GET_QUESTION (state, data) {
      state.questionList = data.data
    },
    SET_USER_QUESTION_LIST (state, data) {
      state.userQuestionList = data
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
    },
    async getUserQusetion ({ commit }, id) {
      const res = []
      for (let i = 0; i < 5; i++) {
        const { data } = await getUserQusetion(id, i)
        if (data.data.length !== 0) res.push(data.data[0])
      }
      commit('SET_USER_QUESTION_LIST', res)
    }
  }
}
