let sideBar = [
    {
        title: 'canvas时钟',
        name: 'canvasTime',
        path: '/layout/canvasTime',
        icon: 'fa-clock-o',
        children: []
    },{
        title: 'canvas签名',
        name: 'canvasAutoGraph',
        path: '/layout/canvasAutoGraph',
        icon: 'fa-pencil-square-o',
        children: []
    },{
        title: '滑动验证',
        name: 'slidVer',
        path: '/layout/slidVer',
        icon: 'fa-hand-o-up',
        children: []
    },{
        title: 'h5GAME',
        name: 'h5GAME',
        path: '/layout/h5GAME',
        icon: 'fa-gamepad',
        children: [
            {
                title: '粒子逃脱',
                name: 'escape',
                path: '/layout/h5GAME/escape'
            }
        ]
    },
]
export default sideBar;