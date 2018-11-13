import { getBanners, getFilters, getProduct, clickLike } from '@/api/product'

export default {
  namespaced: true,
  state: {
    bannersList: [],
    filtersList: [],
    productList: [],
    proPageInfo: {}
  },
  getters: {
    bannersList: state => state.bannersList,
    filtersList: state => state.filtersList,
    productList: state => state.productList,
    proPageInfo: state => state.proPageInfo
  },
  mutations: {
    getBanners (state, data) {
      state.bannersList = data
    },
    getFilters (state, data) {
      state.filtersList = data
    },
    getProducts (state, data) {
      state.productList = data
    },
    getMoreProducts (state, data) {
      state.productList = state.productList.concat(data)
    },
    getProPageInfo (state, data) {
      state.proPageInfo = data
    }
  },
  actions: {
    async getBanners ({ commit }) {
      const dataFrom = {
        from: 2
      }
      const { data } = await getBanners(dataFrom)
      commit('getBanners', data)
    },
    async getFilters ({ commit }) {
      const { data } = await getFilters()
      commit('getFilters', data)
    },
    async getProducts ({ commit }, dataFrom) {
      const { data } = await getProduct(dataFrom)
      commit('getProducts', data.data.galleries)
      commit('getProPageInfo', data.page_info)
    },
    async getMoreProducts ({ commit }, dataFrom) {
      const { data } = await getProduct(dataFrom)
      commit('getMoreProducts', data.data.galleries)
      commit('getProPageInfo', data.page_info)
    },
    async clickLike ({ commit }, dataForm) {
      let data = this.state.product.productList
      await clickLike(dataForm.id)
      data[dataForm.index].like_count += 1
      commit('getProducts', data)
    }
  }
}
