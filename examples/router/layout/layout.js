let route = [
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/layout'),
        meta: {
            title: 'layout'
        },
        children: []
    }
];

export default route;