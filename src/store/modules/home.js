import { getBanners, getFilters } from '@/api/home'

export default {
  namespaced: true,
  state: {
    bannersList: [],
    filtersList: []
  },
  getters: {
    bannersList: state => state.bannersList,
    filtersList: state => state.filtersList
  },
  mutations: {
    getBanners (state, data) {
      state.bannersList = data
    },
    getFilters (state, data) {
      state.filtersList = data
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
    }
  }
}
