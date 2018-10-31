import { getBanners, getFilters, getUsers, getUserInfo, getHistory, getPicture } from '@/api/home'

export default {
  namespaced: true,
  state: {
    bannersList: [],
    filtersList: [],
    usersList: [],
    pageInfo: {},
    userInfo: {},
    historyList: [],
    historyPageInfo: {},
    pictureList: [],
    picturePageInfo: {}
  },
  getters: {
    bannersList: state => state.bannersList,
    filtersList: state => state.filtersList,
    usersList: state => state.usersList,
    pageInfo: state => state.pageInfo,
    userInfo: state => state.userInfo,
    historyList: state => state.historyList,
    historyPageInfo: state => state.historyPageInfo,
    pictureList: state => state.pictureList,
    picturePageInfo: state => state.picturePageInfo
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
    },
    getMoreHistory (state, data) {
      state.historyList = state.historyList.concat(data)
    },
    getHisPageInfo (state, data) {
      state.historyPageInfo = data
    },
    getPicture (state, data) {
      state.pictureList = data
    },
    getMorePicture (state, data) {
      state.pictureList = state.pictureList.concat(data)
    },
    getPicPageInfo (state, data) {
      state.picturePageInfo = data
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
      commit('getHistory', data.data)
      commit('getHisPageInfo', data.page_info)
    },
    async getMoreHistory ({ commit }, dataFrom) {
      const { data } = await getHistory(dataFrom)
      commit('getMoreHistory', data.data)
      commit('getHisPageInfo', data.page_info)
    },
    async getPicture ({ commit }, dataFrom) {
      const { data } = await getPicture(dataFrom)
      commit('getPicture', data.data)
      commit('getPicPageInfo', data.page_info)
    },
    async getMorePicture ({ commit }, dataFrom) {
      const { data } = await getPicture(dataFrom)
      commit('getMorePicture', data.data)
      commit('getPicPageInfo', data.page_info)
    }
  }
}
