import slidVer from './src/slidVer'

slidVer.install = function(Vue){
    Vue.component(slidVer.name, slidVer);
}

export default slidVer;