let route = [
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/layout'),
        redirect: '/layout/h5Game',
        meta: {
            title: '主页'
        },
        children: [
            {
                path: '/layout/h5Game',
                name: 'h5Game',
                component: () => import('@/views/layout/h5Game/h5Game'),
                redirect: '/layout/h5Game/escape',
                meta: {
                    title: 'h5Game'
                },
                children: [
                    {
                        path: '/layout/h5Game/escape',
                        name: 'escape',
                        component: () => import('@/views/layout/h5Game/escape/escape'),
                        meta: {
                            title: '粒子逃脱'
                        }
                    }
                ]
            },{
                path: '/layout/canvasTime',
                name: 'canvasTime',
                component: () => import('@/views/layout/canvasTime/canvasTime'),
                meta: {
                    title: 'canvas时钟'
                },
            }
        ]
    }
];

export default route;