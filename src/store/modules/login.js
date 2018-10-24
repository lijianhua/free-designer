import { fetchLogin } from '@/api/login'
import Cookie from 'js-cookie'

const initForm = () => ({
  mobile: '13716700000',
  password: 'workwork'
})

export default {
  namespaced: true,
  state: {
    form: {
      data: initForm()
    }
  },
  getters: {
    formData: state => state.form.data
  },
  mutations: {},
  actions: {
    async submit ({ state }, $router) {
      const { data: formData } = state.form
      const { data } = await fetchLogin(formData)
      Cookie.set('user', JSON.stringify(data))
      $router.push({
        name: 'home'
      })
    }
  }
}
