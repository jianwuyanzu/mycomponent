import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = {
    routes: [
        {
            path: '/choseFiles',
            name: 'choseFiles',
            component: () => import('@/views/choseFiles/choseFiles')
        },{
            path:'/escape',
            name: 'escape',
            component: () =>import('@/views/escape/escape')
        }
    ]
};
let routerConfig = new Router(router);

// 路由前置守卫
routerConfig.beforeEach((to, from, next) => {
    next();
});
// 路由后置守卫
routerConfig.afterEach((to, from) => {
    
})

export default routerConfig;
