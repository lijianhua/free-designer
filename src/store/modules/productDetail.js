import { getPicUser, getGalleryPic, getGalleryComment, addGalleryComment, getUserDetail, clickLike } from '@/api/product'

export default {
  namespaced: true,
  state: {
    galleryUserInfo: {},
    galleryList: [],
    galleryCommentList: [],
    commentPageInfo: {},
    userDetail: {}
  },
  getters: {
    galleryUserInfo: state => state.galleryUserInfo,
    galleryList: state => state.galleryList,
    galleryCommentList: state => state.galleryCommentList,
    commentPageInfo: state => state.commentPageInfo,
    userDetail: state => state.userDetail
  },
  mutations: {
    getUserInfo (state, data) {
      state.galleryUserInfo = data
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
    },
    userDetail (state, data) {
      state.userDetail = data
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
    },
    async getUserDetail ({ commit }, user) {
      const { data } = await getUserDetail(user)
      commit('userDetail', data)
    },
    async clickLike ({ commit }, id) {
      let data = this.state.productDetail.galleryUserInfo
      await clickLike(id)
      data.like_count += 1
      commit('getUserInfo', data)
    }
  }
}
