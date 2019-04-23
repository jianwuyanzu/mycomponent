import preview from './src/preview'

preview.install = function(Vue){
    Vue.component(preview.name, preview);
}

export default preview;