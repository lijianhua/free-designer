import Router from './index'
import Cookie from 'js-cookie'

export default router => {
  router.beforeEach((to, from, next) => {
    const userInfo = Cookie.get('user')

    if (!userInfo && to.path !== '/login') {
      Router.replace('/login')
    }

    next()
  })
}
