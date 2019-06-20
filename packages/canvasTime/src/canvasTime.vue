<template>
    <div class="CANVASTIME">
        <canvas class="canvas" ref="canvasTime" :style="canvasStyle"></canvas>
    </div>
</template>

<script>
import map from './js/Map'
import indicate from './js/Indicator'
import clockHand from './js/ClockHand'
import timeAdd from './js/TimeAdd'
import dateAdd from './js/DateAdd'

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
    name: 'canvasTime',
    props: {
        type: {
            type: String,
            default: () => 'conti'
        },
        size: {
            type: Number,
            default: () => 200
        },
        bg_color: {
            type: String,
            default: () => '#ffffff'
        },
        // 表盘数据
        indicate: {
            type: Boolean,
            default: false
        },
        indicate_color: {
            type: String,
            default: () => '#333333'
        },
        // 表针数据
        clockHand_color: {
            type: String,
            default: () => '#9d9d5c'
        },
        clockHand_point_color: {
            type: String,
            default: () => '#666600'
        },
        clockHand_secType: {
            type: Boolean,
            default: () => true
        },
        // 具体时间数据
        timeAdd_color: {
            type: String,
            default: () => '#333333'
        },
        time_24h: {
            type: Boolean,
            default: () => true
        },
        // 具体日期数据
        dateAdd_color: {
            type: String,
            default: () => '#999999'
        }
    },
    computed: {
        canvasStyle(){
            let a = {
                width: `${this.size}px`,
                height: `${this.size}px`
            }
            return a;
        }
    },
    methods: {
        // 所有数据初始化
        dataInit(){
            this.mapInit();
            this.indicateInit();
            this.clockHandInit();
            this.timeAddInit();
            this.dateAddInit();
        },
        // 背景初始化
        mapInit(){
            const canvas = this.$refs.canvasTime;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            map.init({
                canvas,
                width: canvas.clientWidth,
                height: canvas.clientHeight,
                bg_color: this.bg_color
            });
        },
        // 表盘初始化
        indicateInit(){
            indicate.init({
                indicate_color: this.indicate_color,
                size: this.size,
            })
        },
        // 表针初始化
        clockHandInit(){
            clockHand.init({
                clockHand_color: this.clockHand_color,
                clockHand_point_color: this.clockHand_point_color,
                size: this.size,
                clockHand_secType: this.clockHand_secType
            })
        },
        // 具体时间初始化
        timeAddInit(){
            timeAdd.init({
                timeAdd_color: this.timeAdd_color,
                time_24h: this.time_24h,
                size: this.size,
                x: this.size/2,
                y: this.size/1.7
            })
        },
        // 具体日期初始化
        dateAddInit(){
            dateAdd.init({
                size: this.size,
                dateAdd_color: this.dateAdd_color,
                x: this.size/2,
                y: this.size/1.5
            })
        },
        // 所有数据渲染
        startAnimation(){
            // 地图渲染
            map.render();
            // 表盘渲染
            if(this.indicate){
                indicate.render();
            }
            // 判断钟表类型
            switch(this.type){
                case 'conti': this.clock_conti();break;
            }
            animationID = raf(this.startAnimation);
        },
        // conti数据渲染
        clock_conti(){
            clockHand.render();
            timeAdd.render();
            dateAdd.render();
        },
    },
    mounted(){
        this.dataInit();
        this.startAnimation();
    },
    destroyed(){
        cancelRaf(animationID);
    }
}
</script>

<style lang="scss" scoped>
.CANVASTIME{
    .canvas{
        // width: 200px;
        // height: 200px;
    }
}
</style>
