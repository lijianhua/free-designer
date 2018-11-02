import { updateUserInfoApi, changePasswordApi, getWorkListApi, getOrderListApi } from '@/api/my'
import Cookie from 'js-cookie'

const defaultWorkPagination = {
  order_by: 'view_count',
  page: 1,
  per_page: 8
}

export default {
  namespaced: true,
  state: {
    formData: {}, // 个人信息表单
    workList: [], // 作品列表
    workPagination: defaultWorkPagination, // 作品分页
    orderTabActive: 'send', // send 发单 apply 接单
    sendOrderList: [], // 发单已完成列表
    applyOrderList: [] // 接单已完成列表
  },
  getters: {
    formData: state => state.formData,
    workList: state => state.workList,
    orderTabActive: state => state.orderTabActive,
    sendOrderList: state => state.sendOrderList,
    applyOrderList: state => state.applyOrderList
  },
  mutations: {
    SET_FORM_DATA (state, v) {
      state.formData = v
    },
    SET_WORK (state, v) {
      state.workList = v.data.galleries
      state.workPagination = v.page_info
    },
    SET_ORDER_TAB_ACTIVE (state, v) {
      state.orderTabActive = v
    },
    SET_SEND_ORDER_LIST (state, v) {
      state.sendOrderList = v.data
    },
    SET_APPLY_ORDER_LIST (state, v) {
      state.applyOrderList = v.data
    }
  },
  actions: {
    async updateUserInfo ({ state, rootState, commit }, value) {
      const { formData } = state
      const { data } = await updateUserInfoApi({
        ...formData,
        ...value,
        role: formData.roles.join(',')
      })
      data.roles = data.role.split(',')
      rootState.userInfo = null
      commit('SET_FORM_DATA', data)
      Cookie.set('user', JSON.stringify(data))
    },
    async changePassword (ctx, value) {
      await changePasswordApi(value)
      Cookie.remove('user')
      location.reload()
    },
    async getWorkList ({ state, rootState, commit }, isPullDown = true) {
      const { id } = rootState.userInfo
      const { workPagination, workList } = state
      const pagination = defaultWorkPagination

      if (!isPullDown) {
        if (pagination.page > workPagination.total_page) {
          return
        }
        pagination.page = workPagination.page + 1
      }

      const { data } = await getWorkListApi(id, pagination)

      if (!isPullDown) {
        data.data.galleries = workList.concat(data.data.galleries)
      }
      commit('SET_WORK', data)
    },
    async getOrderList ({ state, commit }, tabActive) {
      const { orderTabActive } = state
      const { data } = await getOrderListApi(tabActive || orderTabActive)
      if (orderTabActive === 'send') {
        commit('SET_SEND_ORDER_LIST', data)
      } else if (orderTabActive === 'apply') {
        commit('SET_APPLY_ORDER_LIST', data)
      }
    }
  }
}
