import Vue from 'vue'
import Router from 'vue-router'

// layout
import layout from './layout/layout'

Vue.use(Router)

let data = {
    routes: [
        {
            path: '/',
            redirect: '/layout',
        }
    ]
};
data.routes.push(...layout);

let router = new Router(data);

// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 不认识的路由默认跳登入页 同时设置title
    if (!to.name) {
        
    } else {
        document.title = to.meta.title
        next()
    }
})

export default router;
