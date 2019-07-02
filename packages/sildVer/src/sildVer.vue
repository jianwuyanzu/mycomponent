<template>
    <div class="SILDVER">
        <div class="sliderContainer" ref="sliderContainer"
                                     @mousemove="handleDragMove($event)"
                                     @touchmove="handleDragMove($event)"
                                     @mouseup="handleDragEnd($event)"
                                     @touchend="handleDragEnd($event)">
            <div class="sliderMask" ref="sliderMask" :class="{sliderMask_fail: fail, sliderMask_success: success}">
                <div class="slider" ref="slider" :class="{slider_fail: fail, slider_success: success}"
                                    @mousedown="handleDragStart($event)"
                                    @touchstart="handleDragStart($event)"
                                    @mouseout="handleDragOut($event)">
                    <i class="fa" :class="{'fa-long-arrow-right': !fail && !success, 'fa-times': fail, 'fa-check': success}"></i>
                </div>
            </div>
            <span class="sliderText" v-show="!isMouseDown">向右滑动</span>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
const l = 42, // 滑块边长
  r = 9, // 滑块半径
  w = 310, // canvas宽度
  h = 155, // canvas高度
  PI = Math.PI
const L = l + r * 2 + 3 // 滑块实际边长

let originX, originY;

export default {
    name: 'sildVer',
    props: {
        type: {
            type: String,
            default: () => 'sild'
        }
    },
    data(){
        return{
            isMouseDown: false,
            fail: false,
            success: false,
        }
    },
    methods: {
        // 鼠标或手指按下事件
        handleDragStart(e){
            originX = e.clientX || e.touches[0].clientX;
            originY = e.clientY || e.touches[0].clientY;
            this.isMouseDown = true;
        },
        // 鼠标或手指移动事件
        handleDragMove(e){
            if(this.isMouseDown){
                const eventX = e.clientX || e.touches[0].clientX;
                const eventY = e.clientY || e.touches[0].clientY;
                const moveX = eventX - originX;
                const moveY = eventY - originY;
                if (moveX > 0 && moveX + 38 < this.$refs.sliderContainer.clientWidth){
                    this.$refs.slider.style.left = moveX + 'px';
                    this.$refs.sliderMask.style.width = moveX + 'px';
                }
                
            }
            
        },
        // 鼠标或手指抬起事件
        handleDragEnd(e){
            this.isMouseDown = false;
            this.panduan();
        },
        // 鼠标或手指离开事件
        handleDragOut(e){
            // if(this.isMouseDown){
            //     this.panduan();
            // }
        },
        // 验证判断
        panduan(){
            let x = this.$refs.slider.style.left.split('px')[0];
            let y = this.$refs.sliderContainer.clientWidth;
            // console.log(x, y)
            if(this.type == 'sild' && y-x-38 < 5){
                this.success = true;
            }else{
                this.fail = true;
            }
            setTimeout(()=>{
                this.reset();
            }, 1000)
        },
        // 复位
        reset(){
            this.isMouseDown = false;
            this.fail = false;
            this.success = false;
            this.$refs.slider.style.left = 0 + 'px';
            this.$refs.sliderMask.style.width = 0 + 'px';
        }
    }
}
</script>

<style scoped lang="scss">
.SILDVER{
    width: 100%;
    height: 100%;
    min-width: 310px;
    .sliderContainer{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        background: #f7f9fa;
        color: #45494c;
        border: 1px solid #e4e7eb;
        .sliderMask{
            width: 0px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 0;
            background: #D1E9FE;
            &.sliderMask_fail{
                background-color: #fce1e1 !important;
            }
            &.sliderMask_success{
                background-color: #D2F4EF;
            }
            .slider{
                position: absolute;
                left: 0;
                top: 0;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #fff;
                color: #6d7379;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                transition: background .2s linear;
                cursor: pointer;
                &:hover{
                    background: #1991FA;
                    color: #fff;
                }
                &.slider_fail{
                    background-color: #f57a7a;
                    color: #fff;
                }
                &.slider_success{
                    background-color: #52CCBA;
                    color: #fff;
                }
            }
        }
    }
}
</style>
