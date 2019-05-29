let route = [
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/state/404'),
        meta: {
            title: '404'
        }
    }
];

export default route;