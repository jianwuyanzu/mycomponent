<template>
    <div class="AUTOGRAPH">
        <canvas ref="autoGraph" :style="canvasStyle"></canvas>
    </div>
</template>

<script>
import drawingBoard from './js/DrawingBoard'

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;

let addClick = function(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

export default {
    name: 'canvasAutoGraph',
    props: {
        width: {
            type: Number,
            default: () => 500
        },
        height: {
            type: Number,
            default: () => 500
        },
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
        canvasStyle(){
            let a = {
                width: `${this.width}px`,
                height: `${this.height}px`
            }
            return a;
        }
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
            canvas.addEventListener('mousedown', this.canvasMousedown)
        },
        // 鼠标事件
        canvasMousedown(e){
            let mouseX = e.pageX - this.$refs.autoGraph.getBoundingClientRect().left;
            let mouseY = e.pageY - this.$refs.autoGraph.getBoundingClientRect().top;
            paint = true;

            addClick(mouseX, mouseY, false);
            this.render();
        },
        // 渲染
        render(){
            drawingBoard.render({
                pen_color: this.pen_color,
                clickX: clickX,
                clickY: clickY,
                clickDrag: clickDrag,
                paint: paint,
                lineWidth: this.lineWidth,
            });
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
    }
}
</style>
