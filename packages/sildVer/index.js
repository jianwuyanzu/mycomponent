import sildVer from './src/sildVer'

sildVer.install = function(Vue){
    Vue.component(sildVer.name, sildVer);
}

export default sildVer;