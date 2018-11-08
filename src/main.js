import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import MuseUI from 'muse-ui'
import { sync } from 'vuex-router-sync'

import './assets/css/reset.css'
import './assets/css/icon.css'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import 'muse-ui/dist/muse-ui.css'
import './assets/css/resetUi.scss' // 修改muse-ui mint-ui 默认样式

import delay from './utils/delay'
import hook from './router/hook'
console.log(13911519564)
Vue.use(delay)
Vue.use(MintUI)
Vue.use(MuseUI)

sync(store, router)
hook(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
