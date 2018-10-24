import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import { sync } from 'vuex-router-sync'

import './assets/css/reset.css'
import './assets/css/icon.css'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'

import delay from './utils/delay'
import hook from './router/hook'

Vue.use(delay)
Vue.use(MintUI)

sync(store, router)
hook(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
