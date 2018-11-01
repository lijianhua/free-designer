import Router from './index'
import Store from '../store'
import Cookie from 'js-cookie'

export default router => {
  router.beforeEach((to, from, next) => {
    let userInfo = Store.state.userInfo

    if (userInfo) {
      return next()
    }

    userInfo = Cookie.get('user')

    if (userInfo) {
      Store.commit('SET_USER_INFO', JSON.parse(userInfo))
      return next()
    }

    if (!userInfo && to.path !== '/login') {
      Router.replace('/login')
    }
    next()
  })
}
