/**
 * 画板类
 */

class DrawingBoard {
    options(options){
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = options.width;
        this.height = options.height;
        this.bg_color = options.bg_color;
        this.ctx.fillStyle = this.bg_color;
        this.ctx.fillRect(0, 0, this.width, this.height);

    }
    // 清理
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    render(options){
        let pen_color = options.pen_color;
        let clickX = options.clickX;
        let clickY = options.clickY;
        let clickDrag = options.clickDrag;
        let paint = options.paint;
        let lineWidth = options.lineWidth;

        let point = {};

        this.ctx.strokeStyle = pen_color;
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = lineWidth;
        
        // while (clickX.length > 0){
        //     point.x = clickX.pop();
        //     point.y = clickY.pop();
        //     point.drag = clickDrag.pop();
        //     console.log(point)
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(point.x, point.y);
        //     this.ctx.lineTo(0, 0);
        //     this.ctx.closePath();
        //     this.ctx.stroke();
        // }
    }
}

export default new DrawingBoard();