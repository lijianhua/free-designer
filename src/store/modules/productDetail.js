import { getPicUser, getGalleryPic, getGalleryComment, addGalleryComment } from '@/api/product'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    galleryList: [],
    galleryCommentList: [],
    commentPageInfo: {}
  },
  getters: {
    userInfo: state => state.userInfo,
    galleryList: state => state.galleryList,
    galleryCommentList: state => state.galleryCommentList,
    commentPageInfo: state => state.commentPageInfo
  },
  mutations: {
    getUserInfo (state, data) {
      state.userInfo = data
    },
    getGalleryList (state, data) {
      state.galleryList = data
    },
    getCommentList (state, data) {
      state.galleryCommentList = data
    },
    getMoreComment (state, data) {
      state.galleryCommentList = state.galleryCommentList.concat(data)
    },
    getGalleryPage (state, data) {
      state.commentPageInfo = data
    }
  },
  actions: {
    async getUserInfo ({ commit }, user, gallery) {
      const { data } = await getPicUser(user, gallery)
      commit('getUserInfo', data)
    },
    async getGalleryList ({ commit }, user, gallery) {
      const { data } = await getGalleryPic(user, gallery)
      commit('getGalleryList', data.data)
    },
    async getCommentList ({ commit }, dataFrom) {
      const { data } = await getGalleryComment(dataFrom)
      commit('getCommentList', data.data)
      commit('getGalleryPage', data.page_info)
    },
    async getMoreComment ({ commit }, dataFrom) {
      const { data } = await getGalleryComment(dataFrom)
      commit('getMoreComment', data.data)
      commit('getGalleryPage', data.page_info)
    },
    async addGalleryComment ({ commit }, dataFrom) {
      await addGalleryComment(dataFrom)
    }
  }
}
