/**
 * 流星
 */

import map from './Map';
import Point from './Point';

class Meteor extends Point{
    constructor(options){
        super(options);
        this.radius = Math.random() * 2 + 1;                        // 半径
        this.color = "#2c3e50";                                     // 颜色
        this.speed = options.speed || Math.random() * 2 + 3;      // 速度
    }

    // 更新方法
    update() {
        this.x -= this.speed;
        this.y += this.speed;
        // 粒子从左边离开视界
        if (this.x < -10) {
            this.x = map.width + 10 + Math.random() * 30;
        }
        // 粒子从底部离开视界
        if (this.y > map.height + 10) {
            this.y = -10 + Math.random() * -30;
        }
    }

    // 渲染粒子
    render() {
        var self = this;
        map.ctx.beginPath();
        map.ctx.fillStyle = self.color;
        map.ctx.arc(self.x, self.y, self.radius, 0, Math.PI*2, false);
        map.ctx.fill();
    }
}

export default Meteor;