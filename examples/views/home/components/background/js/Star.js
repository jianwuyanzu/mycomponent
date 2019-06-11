/**
 * 闪烁的星星
 */

import map from './Map';
import Point from './Point';

class Star extends Point {
    constructor(options){
        super(options);
        this.startradius = 0.01;                                       // 开始半径
        this.radius = Math.random() * 2 + 1;                        // 半径
        this.radiuschangType = 'add';                                // 半径改变类型
        this.color = "#ffffff";                                     // 颜色
        this.speed = options.speed || Math.random() * 2 + 0.5;      // 速度
        this.angle = 0;                                          // 旋转角度
        this.r = Math.random() - 0.8;
    }
    // 更新方法
    update() {
        // 圆周运动
        this.r = this.r > 0.1 ? 0.1 : (this.r < -0.1 ? -0.1 : this.r)
        this.x += this.r*Math.cos(this.angle*(Math.PI/180));
        this.y += this.r*Math.sin(this.angle*(Math.PI/180));
        this.angle+=1;
        // 放大缩小
        if(this.radiuschangType == 'add'){
            this.startradius += 0.01;
            if(this.startradius > this.radius){
                this.radiuschangType = 'delete';
            }
        }else if(this.radiuschangType == 'delete'){
            this.startradius -= 0.01;
            if(this.startradius<0){
                this.radiuschangType = 'add';
            }
        }else{
            this.startradius -= 0.01;
        }

    }
    // 渲染粒子
    render() {
        var self = this;
        map.ctx.beginPath();
        map.ctx.fillStyle = self.color;
        map.ctx.arc(self.x, self.y, self.startradius>0 ? self.startradius : 0 , 0, Math.PI*2, false);
        map.ctx.fill();
    }
}

export default Star;