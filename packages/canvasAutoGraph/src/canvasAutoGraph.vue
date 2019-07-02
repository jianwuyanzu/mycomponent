<template>
    <div class="AUTOGRAPH">
        <canvas ref="autoGraph"></canvas>
    </div>
</template>

<script>
import drawingBoard from './js/DrawingBoard'

let clickX = [];
let clickY = [];
let pressdowm = false;

let addClick = function(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
}

export default {
    name: 'canvasAutoGraph',
    props: {
        bg_color: {
            type: String,
            default: () => '#f5f5f5'
        },
        pen_color: {
            type: String,
            default: () => '#000000'
        },
        lineWidth: {
            type: Number,
            default: () => 2
        }
    },
    computed: {

    },
    methods: {
        // 画板初始化
        drawingBoard(){
            const canvas = this.$refs.autoGraph;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            drawingBoard.options({
                canvas,
                width: canvas.clientWidth,
                height: canvas.clientHeight,
                bg_color: this.bg_color
            })

            // 事件绑定
            canvas.addEventListener('mousedown', this.canvasMousedown);
            canvas.addEventListener('mousemove', this.canvasMousemove);
            canvas.addEventListener('mouseup', this.canvasMouseup);
            canvas.addEventListener('mouseout', this.canvasMouseout);

            canvas.addEventListener('touchstart', this.canvasTouchstart);
            canvas.addEventListener('touchmove', this.canvasTouchmove);
            canvas.addEventListener('touchend', this.canvasTouchend);
        },
        // 记录点并渲染
        recordAndRender(e){
            let data;
            if(e.pageX){
                data = e
            }else{
                data = e.touches[0];
            }
            let mouseX = data.pageX - this.$refs.autoGraph.getBoundingClientRect().left;
            let mouseY = data.pageY - this.$refs.autoGraph.getBoundingClientRect().top;

            addClick(mouseX, mouseY);
            this.render();
        },
        // 鼠标事件
        canvasMousedown(e){
            pressdowm = true;
            this.recordAndRender(e);
        },
        canvasMousemove(e){
            if(pressdowm){
                this.recordAndRender(e);
            }
            
        },
        canvasMouseup(e){
            pressdowm = false;
            clickX = [];
            clickY = [];

            // this.render();
        },
        canvasMouseout(e){
            pressdowm = false;
            clickX = [];
            clickY = [];
        },
        // 手指事件
        canvasTouchstart(e){
            pressdowm = true;
            this.recordAndRender(e);
        },
        canvasTouchmove(e){
            if(pressdowm){
                this.recordAndRender(e);
            }
            e.preventDefault();
        },
        canvasTouchend(e){
            pressdowm = false;
            clickX = [];
            clickY = [];
        },
        // 渲染
        render(){
            drawingBoard.render({
                pen_color: this.pen_color,
                clickX: clickX.slice(clickX.length-2, clickX.length),
                clickY: clickY.slice(clickY.length-2, clickY.length),
                // clickX: [clickX[0], clickX[clickX.length-1]],
                // clickY: [clickY[0], clickY[clickY.length-1]],
                lineWidth: this.lineWidth,
            });
        },
        // 清除
        clear(){
            drawingBoard.clear();
            this.drawingBoard();
        },
        // 获取图片
        getData(){
            return new Promise((resolve, reject)=>{
                this.$refs.autoGraph.toBlob((blob)=>{
                    resolve({
                       base64: this.$refs.autoGraph.toDataURL('image/png'),
                       blob: blob
                    })
                });
            })
        },
        // 插入图片
        insertImg(img){
            this.clear();
            drawingBoard.insertImg(img);
        }
    },
    mounted(){
        this.drawingBoard();
    }
}
</script>

<style scoped lang="scss">
.AUTOGRAPH{
    >canvas{
        border-radius: 20px;
        cursor: crosshair;
        width: 100%;
        height: 100%;
    }
}
</style>
