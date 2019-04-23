import escape from './src/escape'

escape.install = function(Vue){
    Vue.component(escape.name, escape);
}

export default escape;