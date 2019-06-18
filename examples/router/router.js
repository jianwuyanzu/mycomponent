import Vue from 'vue'
import Router from 'vue-router'

// home
import home from './home/home'
// layout
import layout from './layout/layout'
// state
import state from './state/state'

Vue.use(Router)

let data = {
    routes: [
        {
            path: '/',
            redirect: '/home',
        }
    ]
};
data.routes.push(...home, ...layout, ...state);

let router = new Router(data);

// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 不认识的路由默认跳登入页 同时设置title
    if (to.meta.title) {
        document.title = to.meta.title
        next()
    } else {
        router.push({
            name: '404'
        })
    }
})

export default router;
