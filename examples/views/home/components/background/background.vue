<template>
    <canvas class="canvas_back" ref="canvas"></canvas>
</template>

<script>
import map from './js/Map'
import Star from './js/Star'
import ParticleLine from './js/ParticleLine'

let stars = [];   // 闪烁的星星
const starsCount = 0;      // 闪烁的星星数量

let particle = [];  // 粒子线条
const particleCount = 200;
const maxline = 9000;    // 触发连线的距离

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
            for(let i = 0; i < count; i++){
                const x = Math.random() * map.width;
                const y = Math.random() * map.height;
                stars.push(new Star({x, y}));
            }
        },
        // 添加粒子线条
        createParticle(count){
            particle = [];
            for(let i = 0; i < count; i++){
                const x = Math.random() * map.width;
                const y = Math.random() * map.height;
                const xa = (Math.random() * 2 - 1)/5;
                const ya = (Math.random() * 2 - 1)/5;
                particle.push(new ParticleLine({x, y, xa, ya}));
            }
        },
        // 所有数据初始化
        dataInit(){
            this.backInit();
            this.createstars(starsCount);
            this.createParticle(particleCount);
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

            // 粒子线条渲染
            let dot;
            let nowDot;
            for(let i=0; i<particle.length; i++){
                dot = particle[i];
                dot.render();
                dot.update();

                for(let j=0; j<particle.length; j++){
                    nowDot = particle[j];
                    // continue跳出当前循环开始新的循环
                    if(nowDot===dot||nowDot.x===null||nowDot.y===null) continue;
                    // 计算两点间的距离
                    let dx = dot.x - nowDot.x,
                        dy = dot.y - nowDot.y;
                    let dc = dx*dx + dy*dy;
                    if(Math.sqrt(dc)>Math.sqrt(maxline)) continue;
                    let ratio = (maxline - dc) / maxline;
                    dot.line(nowDot, ratio);
                }
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
