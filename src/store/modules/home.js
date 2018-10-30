import { getBanners, getFilters, getUsers } from '@/api/home'

export default {
  namespaced: true,
  state: {
    bannersList: [],
    filtersList: [],
    usersList: [],
    pageInfo: {}
  },
  getters: {
    bannersList: state => state.bannersList,
    filtersList: state => state.filtersList,
    usersList: state => state.filtersList,
    pageInfo: state => state.pageInfo
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
      console.info(data)
      commit('getUsers', data)
    },
    async getMoreUsers ({ commit }, dataFrom) {
      const { data } = await getUsers(dataFrom)
      commit('getMoreUsers', data)
    }
  }
}
