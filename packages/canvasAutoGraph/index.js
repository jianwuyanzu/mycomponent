import canvasAutoGraph from './src/canvasAutoGraph'

canvasAutoGraph.install = function(Vue){
    Vue.component(canvasAutoGraph.name, canvasAutoGraph);
}

export default canvasAutoGraph;