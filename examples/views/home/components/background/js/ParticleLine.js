function find_random(num_one,num_two){
    return Math.random()*(num_two-num_one)+num_one;
}
/**
 * 粒子线条
 */

import map from './Map';
import Point from './Point';

class ParticleLine extends Point {
    constructor(options) {
        super(options);
        this.xa = options.xa;                   // x偏移量
        this.ya = options.ya;                   // y偏移量
        this.color = find_random(0,360);
        this.warea = {x: null, y: null};        // 鼠标位置
        this.binding();
    }

    // 事件绑定
    binding(){

        let canvasElement = document.getElementsByClassName('canvas_back')[0];
        let self = this;
        canvasElement.addEventListener('mousemove', (e) => {
            self.warea.x = e.clientX + 10;
            self.warea.y = e.clientY;
        });
    }

    // 更新方法
    update(){
        if(this.warea.x && this.warea.y){
            // 计算两点间的距离
            let dx = this.x - this.warea.x,
                dy = this.y - this.warea.y;
            let dc = dx*dx + dy*dy;
            if(dc<6000 && dc>1000){
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
            }else{
                this.x += this.xa;
                this.y += this.ya;
            }
        }else{
            this.x += this.xa;
            this.y += this.ya;
        }
        

        // 遇到边界速度反向
        this.xa *= (this.x < -10 || this.x > (map.width + 10)) ? -1 : 1;
        this.ya *= (this.y < -10 || this.y > (map.height + 10)) ? -1 : 1;
    }

    // 渲染粒子
    render(){
        var self = this;
        map.ctx.beginPath();
        map.ctx.fillStyle = 'hsl('+this.color+',100%,50%)';
        // map.ctx.fillStyle = '#000000';
        map.ctx.arc(self.x, self.y, self.radius ? self.radius : 1 , 0, Math.PI*2, false);
        map.ctx.fill();
    }

    // 连线
    line(nowDot, ratio){
        map.ctx.beginPath();
        map.ctx.lineWidth = ratio / 2;
        map.ctx.strokeStyle = `#C0C0C0`;
        map.ctx.moveTo(this.x, this.y);
        map.ctx.lineTo(nowDot.x, nowDot.y);
        map.ctx.stroke();
        map.ctx.globalAlpha = ratio;
    }
}

export default ParticleLine;