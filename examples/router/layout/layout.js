let route = [
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/layout'),
        redirect: '/layout/canvasTime',
        meta: {
            title: '主页'
        },
        children: [
            {
                path: '/layout/canvasTime',
                name: 'canvasTime',
                component: () => import('@/views/layout/canvasTime/canvasTime'),
                meta: {
                    title: 'canvas时钟'
                },
            },{
                path: '/layout/canvasAutoGraph',
                name: 'canvasAutoGraph',
                component: () => import('@/views/layout/canvasAutoGraph/canvasAutoGraph'),
                meta: {
                    title: 'canvas签名'
                },
            },{
                path: '/layout/sildVer',
                name: 'sildVer',
                component: () => import('@/views/layout/sildVer/sildVer'),
                meta: {
                    title: '滑动验证'
                },
            },{
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
            },
        ]
    }
];

export default route;