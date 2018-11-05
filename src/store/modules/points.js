import { getPointsListApi } from '@/api/points'

const defaultPointsPagination = {
  order_by: 'created_on',
  page: 1,
  per_page: 8
}

export default {
  namespaced: true,
  state: {
    pointsList: [],
    pointsPagination: defaultPointsPagination
  },
  getters: {
    pointsList: state => state.pointsList,
    pointsPagination: state => state.pointsPagination
  },
  mutations: {
    SET_POINTS (state, v) {
      state.pointsList = v.data
      state.pointsPagination = v.page_info
    }
  },
  actions: {
    async getPointsList ({ state, commit }, isPullDown = true) {
      const { pointsPagination, pointsList } = state
      const pagination = defaultPointsPagination

      if (!isPullDown) {
        if (pagination.page >= pointsPagination.total_page) {
          return
        }
        pagination.page = pointsPagination.page + 1
      }

      const { data } = await getPointsListApi(pagination)

      if (!isPullDown) {
        data.data = pointsList.concat(data.data)
      }
      commit('SET_POINTS', data)
    }
  }
}
