<template>
    <canvas class="canvas_back" ref="canvas"></canvas>
</template>

<script>
import map from './js/Map'
import Star from './js/Star'
import Meteor from './js/Meteor'

let stars = [];   // 闪烁的星星
const starsCount = 50;      // 闪烁的星星数量

let meteors = [];   // 流星
const meteorCount = 3;    //流星数量

let animationID = '';

const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const cancelRaf = (id) => window.cancelAnimationFrame(id);

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
            for(let i = 0; i < count; i++){
                const x = Math.random() * map.width;
                const y = Math.random() * map.height;
                const xa = (Math.random() * 2 - 1)/5;
                const ya = (Math.random() * 2 - 1)/5;
                stars.push(new Star({x, y}));
                stars.push(new Star({x, y, xa, ya}));
            }
        },
        // 添加流星
        createMeteor(count){
            meteors = [];
            for (let i = 0; i < count; i++) {
                const x = Math.random() * map.width + map.width;
                const y = Math.random() * map.height;
                meteors.push(new Meteor({x, y}));
            }
        },
        // 所有数据初始化
        dataInit(){
            this.backInit();
            this.createstars(starsCount);
            this.createMeteor(meteorCount);
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

            // 流星渲染
            for(let i=0; i<meteors.length; i++){
                meteors[i].render();
                meteors[i].update();
            }

            animationID = raf(this.startAnimat);
        }
    },
    mounted(){
        this.dataInit();
        this.startAnimat();
    },
    destroyed(){
        cancelRaf(animationID);
    }
}
</script>

<style lang="scss">

</style>
