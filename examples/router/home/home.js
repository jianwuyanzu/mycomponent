let route = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: {
            title: 'home'
        },
        children: []
    }
];

export default route;