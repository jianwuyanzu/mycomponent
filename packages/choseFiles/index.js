import choseFiles from './src/choseFiles'

choseFiles.install = function(Vue){
    Vue.component(choseFiles.name, choseFiles);
}

export default choseFiles;