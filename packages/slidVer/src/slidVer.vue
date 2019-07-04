<template>
    <div class="slidVER">
        <div class="sliderImage" v-if="type == 'slid_image'">
            <i class="refresh fa fa-refresh" @click="reset()"></i>
            <canvas ref="canvas_img"></canvas>
            <canvas ref="canvas_block" class="block"></canvas>
        </div>
        <div class="sliderContainer" ref="sliderContainer"
                                     @mousemove="handleDragMove($event)"
                                     @touchmove="handleDragMove($event)"
                                     @mouseout="handleDragOut($event)">
            <div class="sliderMask" ref="sliderMask" :class="{sliderMask_fail: fail, sliderMask_success: success}">
                <div class="slider" ref="slider" :class="{slider_fail: fail, slider_success: success}"
                                    @mousedown="handleDragStart($event)"
                                    @touchstart="handleDragStart($event)"
                                    @mouseup="handleDragEnd($event)"
                                    @touchend="handleDragEnd($event)">
                    <i class="fa" :class="{'fa-long-arrow-right': !fail && !success, 'fa-times': fail, 'fa-check': success}"></i>
                </div>
            </div>
            <span class="sliderText" v-show="!isMouseDown">向右滑动</span>
        </div>
    </div>
</template>

<script>
const l = 42, // 滑块边长
    r = 9, // 滑块半径
    PI = Math.PI
const L = l + r * 2 + 3 // 滑块实际边长

let originX, originY;

let getRandomNumberByRange = function(start, end){
    return Math.round(Math.random() * (end - start) + start)
}
let getRandomImgSrc = function(w){
    return `https://picsum.photos/${w}/${w/2}/?image=${getRandomNumberByRange(0, 1084)}`;
}

let createImg = function(w){
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = "anonymous";
        let src = getRandomImgSrc(w);
        // const xhr = new XMLHttpRequest();
        // xhr.onloadend = (e) => {
        //     // console.log(e)
        //     const file = new FileReader();
        //     file.readAsDataURL(e.target.response);
        //     file.onloadend = (e) => {
        //         img.src = e.target.result;
        //         img.onload = ()=>{
        //             resolve(img);
        //         }
        //     }
        // };
        // xhr.open('GET', src);
        // xhr.responseType = 'blob';
        // xhr.send();
        img.src = src;
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject('err');
        }
    })
}

// 创建滑块的位置
let draw = function(ctx, x, y, operation){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.stroke();
    ctx[operation]();
    ctx.globalCompositeOperation = 'destination-over';
}

export default {
    name: 'slidVer',
    props: {
        type: {
            type: String,
            default: () => 'slid'
        }
    },
    data(){
        return{
            isMouseDown: false,
            fail: false,
            success: false,
            x: 0,
            y: 0,
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
                    if(this.type == 'slid_image'){
                        this.$refs.canvas_block.style.left = moveX + 'px';
                    }
                }
                
            }
            
        },
        // 鼠标或手指抬起事件
        handleDragEnd(e){
            if(this.isMouseDown){
                this.isMouseDown = false;
                this.panduan();
            }
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
            if(this.type == 'slid' && y-x-38 < 5){
                this.success = true;
                this.fail = false;
            }else if(this.type == 'slid_image' && (this.x-x < 5 && this.x-x > -5 )){
                this.success = true;
                this.fail = false;
            }else{
                this.fail = true;
                this.success = false;
                setTimeout(()=>{
                    this.reset();
                }, 1000)
            }

            if(this.success){
                this.$emit('success');
            }
            if(this.fail){
                this.$emit('fail');
            }
        },
        // 复位
        reset(){
            this.isMouseDown = false;
            this.fail = false;
            this.success = false;
            this.$refs.slider.style.left = 0 + 'px';
            this.$refs.sliderMask.style.width = 0 + 'px';
            if(this.type == 'slid_image'){
                this.$refs.canvas_block.style.left = 0 + 'px';
                this.initImg();
            }
        },
        // 绘制图片
        initImg(){
            let w = this.$refs.sliderContainer.clientWidth;
            let canvas = this.$refs.canvas_img;
            let canvasCtx = this.$refs.canvas_img.getContext('2d');
            let block = this.$refs.canvas_block;
            let blockCtx = this.$refs.canvas_block.getContext('2d');
            blockCtx.clearRect(0, 0, w, w/2);
            block.width = w;
            block.height = w/2;
            canvasCtx.clearRect(0, 0, w, w/2);
            canvas.width = w;
            canvas.height = w/2;
            createImg(w).then((img)=>{
                this.x = getRandomNumberByRange(L + 10, w/2 - (L + 10));
                this.y = getRandomNumberByRange(10 + r * 2, w/2 - (L + 10));
                draw(canvasCtx, this.x, this.y, 'fill');
                draw(blockCtx, this.x, this.y, 'clip');
                canvasCtx.drawImage(img, 0, 0);
                blockCtx.drawImage(img, 0, 0);

                const y = this.y - r * 2 - 1;
                const ImageData = blockCtx.getImageData(this.x - 3, y, L, L);
                block.width = L;
                blockCtx.putImageData(ImageData, 0, y);
            }, (data)=>{
                this.initImg();
            })
        }
    },
    mounted(){
        this.reset();
    }
}
</script>

<style scoped lang="scss">
.slidVER{
    width: 100%;
    height: 100%;
    // min-width: 310px;
    margin: 0 auto;
    position: relative;
    .sliderImage{
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        .refresh{
            position: absolute;
            right: 10px;
            top:10px;
            font-size: 20px;
            cursor: pointer;
            color: #ffffff;
        }
        >canvas{
            // width: 100%;
            // height: 155px;
            &.block{
                position: absolute;
                left: 0;
                top: 0;
                // width: auto;
            }
        }
    }
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
