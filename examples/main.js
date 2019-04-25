import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'font-awesome/css/font-awesome.min.css' // font-awesome
import '@/common/scss/index.scss' // global css
// vconsole
// import vConsole from 'vconsole'
// new vConsole();

// 导入组件库
import hehecomponent from '~/index'
Vue.use(hehecomponent);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
