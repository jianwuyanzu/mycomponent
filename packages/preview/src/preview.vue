<template>
    <div class="preview" v-show="data.index != undefined">
        <div class="preview_body" :class="environment == 'pc' ? 'pc' : 'mobile'" @click="closePreview">
            <div v-for="(x, index) in data.files" :key="index" @touchstart="fileDiv_start($event)" @touchmove="fileDiv_move($event)" @touchend="fileDiv_end($event)" class="file_div" ref="file_div">
                <img class="file" ref="file" v-show="x.type == 'image'" :src="x.url">
            </div>
        </div>
        <div class="tubiao left" @click="switch_img('left')"><i class="fa fa-chevron-circle-left"></i></div>
        <div class="tubiao right" @click="switch_img('right')"><i class="fa fa-chevron-circle-right"></i></div>
    </div>
</template>

<script>
let el = document.documentElement;

// 滑动
let startX, startY, endX, endY, moveX, moveY;
startX = startY = endX = endY = moveX = moveY = 0;

export default {
    name: 'preview',
    props: {
        data: Object
    },
    data(){
        return{
            environment: 'mobile',
            fileData: {}
        }
    },
    watch: {
        data: {
            handler: function(val, oldval){
                
            }
        }
    },
    methods: {
        // fileDOM初始化样式
        fileDOM_init(){
            this.deviation = -(el.offsetWidth * this.data.index);

            if(this.$refs.file_div){
                for(let val of this.$refs.file_div){
                    val.style.transform = `translate(${this.deviation}px)`;
                }
            }
            
            if(this.$refs.file){
                for(let val of this.$refs.file){
                    if(this.environment == 'pc'){
                        val.style.height = '100vh';
                        // val.style.width = '100vw';
                    }else{
                        val.style.width = '100vw';
                    }
                }
            }
        },
        // 鼠标/滑动事件
        fileDiv_start(event){
            // console.log(event)
            let touch = event.targetTouches[0];
            // 滑动起点坐标
            startX = touch.pageX;
            startY = touch.pageY;
        },
        fileDiv_move(event){
            // console.log(event)
            let touch = event.targetTouches[0];
            moveX = Number(touch.pageX - startX);
            if(this.$refs.file_div){
                for(let val of this.$refs.file_div){
                    val.style.transform = `translate(${this.deviation + moveX}px)`;
                    // console.log(moveX, val.style.transform)
                }
            }
        },
        fileDiv_end(event){
            let touch = event.changedTouches[0];
            // 滑动终点坐标
            endX = touch.pageX;
            endY = touch.pageY;
            if(Math.abs(moveX) > 100){
                if(moveX < 0){
                    // 左滑
                    if(this.data.index != this.data.files.length - 1){
                        this.deviation = this.deviation - el.offsetWidth;
                        this.data.index++;
                    }
                }else{
                    // 右滑
                    if(this.data.index != 0){
                        this.deviation = this.deviation + el.offsetWidth;
                        this.data.index--;
                    }
                }
            }
            
            if(this.$refs.file_div){
                for(let val of this.$refs.file_div){
                    val.style.transform = `translate(${this.deviation}px)`;
                }
            }
        },
        // pc切换图片
        switch_img(type){
            if(type == 'right'){
                if(this.data.index != this.data.files.length - 1){
                    this.deviation = this.deviation - el.offsetWidth;
                    this.data.index++;
                }
            }else{
                if(this.data.index != 0){
                    this.deviation = this.deviation + el.offsetWidth;
                    this.data.index--;
                }
            }

            if(this.$refs.file_div){
                for(let val of this.$refs.file_div){
                    val.style.transform = `translate(${this.deviation}px)`;
                }
            }
            
        },
        // 关闭预览
        closePreview(){
            delete this.data.index;
            this.$forceUpdate();
        }
    },
    mounted(){
        console.log(this.data)
        if(el.clientWidth>=750){
            this.environment = 'pc';
        }else{
            this.environment = 'mobile';
        }
        // console.log(this.$refs.file.style.width = '100vw')
        this.fileDOM_init();
        
    },
    updated(){
        this.fileDOM_init();
    }
}
</script>

<style lang="scss" scoped>
.preview_body{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100vh;
    &.pc{
        justify-content: center;
    }
    &.mobile{
        align-items: center;
    }
    .file_div{
        width: 100vw;
        text-align: center;
        transition: all 0.2s;
        .file{
            
        }
    }
}
.tubiao{
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    &.left{
        left: 0;
    }
    &.right{
        right: 0;
    }
    i{
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5)
    }
}
</style>
