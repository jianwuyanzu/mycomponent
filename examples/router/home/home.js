let route = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: {
            title: 'welcome'
        },
        children: []
    }
];

export default route;