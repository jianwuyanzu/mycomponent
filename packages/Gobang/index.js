import Gobang from './src/Gobang'

Gobang.install = function(Vue){
    Vue.component(Gobang.name, Gobang);
}

export default Gobang;