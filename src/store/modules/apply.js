import { getFilters, getDemands, getBanners } from '@/api/apply'

export default {
  namespaced: true,
  state: {
    filterClass: [],
    filterApply: [],
    demandsList: [],
    demandPage: {},
    bannersList: []
  },
  getters: {
    filterClass: state => state.filterClass,
    filterApply: state => state.filterApply,
    demandsList: state => state.demandsList,
    demandPage: state => state.demandPage,
    bannersList: state => state.bannersList
  },
  mutations: {
    getFilterInfo (state, data) {
      const fcates = data.fcates
      fcates.unshift('项目分类')
      state.filterClass = fcates
      let scates = []
      for (let key in data.scates) {
        let obj = data.scates[key]
        obj.name = key
        scates.push(obj)
      }
      let obj = {
        name: '项目需求'
      }
      scates.unshift(obj)
      state.filterApply = scates
    },
    getDemands (state, data) {
      state.demandsList = data
    },
    getMoreDemands (state, data) {
      state.demandsList = state.demandsList.concat(data)
    },
    getDemandPage (state, data) {
      state.demandPage = data
    },
    getBanners (state, data) {
      state.bannersList = data
    }
  },
  actions: {
    async getFilterInfo ({ commit }) {
      const { data } = await getFilters()
      commit('getFilterInfo', data)
    },
    async getDemandsList ({ commit }, dataFrom) {
      const { data } = await getDemands(dataFrom)
      commit('getDemands', data.data)
      commit('getDemandPage', data.page_info)
    },
    async getMoreDemands ({ commit }, dataFrom) {
      const { data } = await getDemands(dataFrom)
      commit('getMoreDemands', data.data)
      commit('getDemandPage', data.page_info)
    },
    async getBanners ({ commit }) {
      const dataFrom = {
        from: 3
      }
      const { data } = await getBanners(dataFrom)
      commit('getBanners', data)
    }
  }
}
