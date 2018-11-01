import { updateUserInfoApi, changePasswordApi } from '@/api/my'
import Cookie from 'js-cookie'

export default {
  namespaced: true,
  state: {
    formData: {}
  },
  getters: {
    formData: state => state.formData
  },
  mutations: {
    SET_FORM_DATA (state, v) {
      state.formData = v
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
    async changePassword ({ rootState }, value) {
      await changePasswordApi(value)
      Cookie.remove('user')
      location.reload()
    }
  }
}
