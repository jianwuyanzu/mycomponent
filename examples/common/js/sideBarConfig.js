let qiyeguanli = [
    {
        title: '首页',
        name: 'homePage',
        path: '/layout/homePage',
        icon: 'fa-hospital-o',
        children: [
            {
                title: '首页',
                name: 'homePage',
                path: '/layout/homePage'
            }
        ]
    }, {
        title: '个人',
        name: 'user',
        path: '/layout/user',
        icon: 'fa-user-o',
        children: [
            {
                title: '个人',
                name: 'user',
                path: '/layout/user'
            }
        ]
    }, {
        title: '设置',
        name: 'setting',
        path: '/layout/setting',
        icon: 'fa-cogs',
        children: [
            {
                title: '设置',
                name: 'setting',
                path: '/layout/setting'
            }
        ]
    }, 
]

// let qiyeguanli = [];

// qiyeguanli.push(...sideBar)
// console.log(qiyeguanli)
export default qiyeguanli;