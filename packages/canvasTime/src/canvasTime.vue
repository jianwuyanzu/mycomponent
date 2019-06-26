<template>
    <div class="CANVASTIME">
        <canvas class="canvas" ref="canvasTime" id="canvasTime" :style="canvasStyle"></canvas>
    </div>
</template>

<script>
import Map from './js/Map'
let map = new Map();
import indicate from './js/Indicator'
import clockHand from './js/ClockHand'
import timeAdd from './js/TimeAdd'
import dateAdd from './js/DateAdd'
import binary from './js/Binary'

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
            default: true
        },
        indicate_color: {
            type: String,
            default: () => '#333333'
        },
        // 表针数据
        clockHand_type: {
            type: String,
            default: () => 'none'
        },
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
            this.clockBinaryInit();
            this.timeAddInit();
            this.dateAddInit(); 
        },
        // 背景初始化
        mapInit(){
            try {
                const canvas = this.$refs.canvasTime;
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;

                map.init({
                    canvas,
                    width: canvas.clientWidth,
                    height: canvas.clientHeight,
                    bg_color: this.bg_color
                });
            } catch (error) {
                
            }
            
        },
        // 表盘初始化
        indicateInit(){
            indicate.init({
                map: map,
                indicate_color: this.indicate_color,
                size: this.size,
            })
        },
        // 表针初始化
        clockHandInit(){
            clockHand.init({
                map: map,
            })
        },
        // 二进制表针初始化
        clockBinaryInit(){
            binary.init({
                map: map,
            })
        },
        // 具体时间初始化
        timeAddInit(){
            timeAdd.init({
                map: map,
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
                map: map,
                size: this.size,
                dateAdd_color: this.dateAdd_color,
                x: this.size/2,
                y: this.size/1.5
            })
        },
        // 所有数据渲染
        startAnimation(){
            // 地图渲染
            this.mapInit();
            map.render();
            // 判断钟表类型
            switch(this.type){
                case 'conti': this.clock_conti();break;
                case 'binary': this.clock_binary();break;
            }
            animationID = raf(this.startAnimation);
            // console.log(this.$refs.canvasTime)
            // debugger
        },
        // conti数据渲染
        clock_conti(){
            // 表盘渲染
            if(this.indicate){
                indicate.render();
            }
            clockHand.render({
                clockHand_type: this.clockHand_type,
                clockHand_color: this.clockHand_color,
                clockHand_point_color: this.clockHand_point_color,
                size: this.size,
                clockHand_secType: this.clockHand_secType,
            });
            timeAdd.render();
            dateAdd.render();
        },
        // binary数据渲染
        clock_binary(){
            binary.render({
                binary_color: this.clockHand_color,
                size: this.size,
                time_24h: this.time_24h,
            });
            dateAdd.render();
        }
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
