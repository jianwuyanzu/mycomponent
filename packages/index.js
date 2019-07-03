import escape from './escape'
import canvasTime from './canvasTime'
import canvasAutoGraph from './canvasAutoGraph'
import slidVer from './slidVer'

// 存储组件列表
const components = [
    escape,
    canvasTime,
    canvasAutoGraph,
    slidVer
];

// 定义install方法，接收vue作为参数，如果使用use注册插件，所有的组件都被注册
const install = function(Vue) {
    // 判断是否安装
    if(install.installed) return;
    // 遍历注册全局组件
    components.map(component => {
        Vue.use(component);
        // Vue.component(component.name, component);
    })
}

// 判断是否直接引入文件
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}

export default {
    // 导出的对象必须具有install才能被Vue.use()方法安装
    install,
    // 具体的组件列表
    escape,
    canvasTime,
    canvasAutoGraph,
    slidVer
}