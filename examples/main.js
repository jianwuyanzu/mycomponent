import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 基本设置
import './common/js/basicSetting'
// scss
import '@/common/scss/index.scss'
// vconsole
import vConsole from 'vconsole'
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
