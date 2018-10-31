import { getBanners, getFilters, getUsers, getUserInfo, getHistory } from '@/api/home'

export default {
  namespaced: true,
  state: {
    bannersList: [],
    filtersList: [],
    usersList: [],
    pageInfo: {},
    userInfo: {},
    historyList: []
  },
  getters: {
    bannersList: state => state.bannersList,
    filtersList: state => state.filtersList,
    usersList: state => state.usersList,
    pageInfo: state => state.pageInfo,
    userInfo: state => state.userInfo,
    historyList: state => state.historyList
  },
  mutations: {
    getBanners (state, data) {
      state.bannersList = data
    },
    getFilters (state, data) {
      state.filtersList = data
    },
    getUsers (state, data) {
      state.usersList = data
    },
    getMoreUsers (state, data) {
      state.usersList = state.usersList.concat(data)
    },
    getPageInfo (state, data) {
      state.pageInfo = data
    },
    getUserInfo (state, data) {
      state.userInfo = data
    },
    getHistory (state, data) {
      state.historyList = data
    }
  },
  actions: {
    async getBanners ({ commit }) {
      const dataFrom = {
        from: 1
      }
      const { data } = await getBanners(dataFrom)
      commit('getBanners', data)
    },
    async getFilters ({ commit }) {
      const { data } = await getFilters()
      commit('getFilters', data)
    },
    async getUsers ({ commit }, dataFrom) {
      const { data } = await getUsers(dataFrom)
      commit('getUsers', data.data)
      commit('getPageInfo', data.page_info)
    },
    async getMoreUsers ({ commit }, dataFrom) {
      const { data } = await getUsers(dataFrom)
      commit('getMoreUsers', data.data)
      commit('getPageInfo', data.page_info)
    },
    async getUserInfo ({ commit }, dataFrom) {
      const { data } = await getUserInfo(dataFrom)
      commit('getUserInfo', data)
    },
    async getHistory ({ commit }, dataFrom) {
      const { data } = await getHistory(dataFrom)
      commit('getHistory', data)
    }
  }
}
