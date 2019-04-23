import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
        {
            path: '/choseFiles',
            name: 'choseFiles',
            component: () => import('./views/choseFiles/choseFiles')
        },{
            path:'/escape',
            name: 'escape',
            component: () =>import('./views/escape/escape')
        }
    ]
})
