<template>
    <canvas class="canvas" ref="canvas"></canvas>
</template>

<script>
import map from './js/Map'
import star from './js/Star'

let stars = [];   // 闪烁的星星
const starsCount = 40;      // 闪烁的星星数量

const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export default {
    methods: {
        // 背景初始化
        backInit(){
            const canvas = this.$refs.canvas;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            map.init({
                canvas,
                width: canvas.clientWidth,
                height: canvas.clientHeight
            })
        },
        // 添加闪烁的星星
        createstars(count){
            stars = [];
            for (let i = 0; i < count; i++) {
                const x = Math.random() * map.width;
                const y = Math.random() * map.height;
                stars.push(new star({x, y}));
            }
        },
        // 所有数据初始化
        dataInit(){
            this.backInit();
            this.createstars(starsCount);
        },
        // 开始动画
        startAnimat(){
            // 地图渲染
            map.render();

            // 闪烁的星星渲染
            for(let i=0; i<stars.length; i++){
                stars[i].render();
                stars[i].update();
            }

            raf(this.startAnimat);
        }
    },
    mounted(){
        this.dataInit();
        this.startAnimat();
    }
}
</script>

<style lang="scss">

</style>
