function find_random(num_one,num_two){
    return Math.random()*(num_two-num_one)+num_one;
}
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
        this.color = find_random(0,360);                                     // 颜色
        this.speed = options.speed || Math.random() * 2 + 0.5;      // 速度
        this.angle = 0;                                          // 旋转角度
        this.r = Math.random() - 0.8;                            // 旋转半径
        this.xa = options.xa || null;                   // x偏移量
        this.ya = options.ya || null;                   // y偏移量
    }
    // 更新方法
    update() {
        this.color += 0.1;
        if(this.xa && this.ya){
            this.x += this.xa;
            this.y += this.ya;

            // 遇到边界速度反向
            this.xa *= (this.x < -10 || this.x > (map.width + 10)) ? -1 : 1;
            this.ya *= (this.y < -10 || this.y > (map.height + 10)) ? -1 : 1;
        }else{
            // 圆周运动
            this.r = this.r > 0.1 ? 0.1 : (this.r < -0.1 ? -0.1 : this.r)
            this.x += this.r*Math.cos(this.angle*(Math.PI/180));
            this.y += this.r*Math.sin(this.angle*(Math.PI/180));
            this.angle+=1;
        }
        
        // 放大缩小
        if(this.radiuschangType == 'add'){
            this.startradius += 0.01;
            if(this.startradius > this.radius){
                this.radiuschangType = 'delete';
            }
        }else if(this.radiuschangType == 'delete'){
            this.startradius -= 0.02;
            if(this.startradius<0){
                this.radiuschangType = 'add';
            }
        }else{
            this.startradius -= 0.02;
        }

    }
    // 渲染粒子
    render() {
        var self = this;
        map.ctx.beginPath();
        map.ctx.fillStyle = 'hsl('+this.color+',100%,50%)';
        // map.ctx.fillStyle = '#000000';
        map.ctx.arc(self.x, self.y, self.startradius>0 ? self.startradius : 0 , 0, Math.PI*2, false);
        map.ctx.fill();
    }
}

export default Star;