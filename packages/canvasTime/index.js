import canvasTime from './src/canvasTime'

canvasTime.install = function(Vue){
    Vue.component(canvasTime.name, canvasTime);
}

export default canvasTime;