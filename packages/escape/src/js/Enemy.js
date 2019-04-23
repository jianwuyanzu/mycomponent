/**
 * 红色粒子类
 */

import map from './Map';
import Point from './Point';

class Enemy extends Point {
    constructor(options) {
        super(options);
        this.radius = Math.random() * 2 + 3;                        // 半径
        this.color = "red";                                         // 颜色
        this.speed = options.speed || Math.random() * 2 + 0.5;      // 速度
        this.collision = false;                                     // 是否撞击
    }
    // 更新方法
    update() {
        this.x -= this.speed;
        this.y += this.speed;
        // 粒子从左边离开视界
        if (this.x < -10) {
            this.x = map.width + 10 + Math.random() * 30;
            this.collision = false;
        }
        // 粒子从底部离开视界
        if (this.y > map.height + 10) {
            this.y = -10 + Math.random() * -30;
            this.collision = false;
        }
    }
    // 加速
    speedUp(speed) {
        this.speed += speed || 0.2;
    }
    // 减速
    speedDown(speed) {
        let _speed = speed || 0.8
        if (this.speed > _speed) this.speed -= _speed;
    }
    // 粒子缩小
    minimize(size) {
        let _size = size || 2;
        if (this.radius > _size) this.radius -= _size;
    }
    // 粒子放大
    magnify(size) {
        this.radius += size || 2;
    }
    // 粒子躲避
    escape(player){
        // let angle = Math.atan(Math.abs(player.y - this.y) / Math.abs(player.x - this.x));
        // let addX = (player.gravityRadius) * Math.cos(angle);
        // let addY = (player.gravityRadius) * Math.sin(angle);

        let c = Math.hypot(player.x - this.x, player.y - this.y);

        let addX = (player.gravityRadius) * (Math.abs(player.x - this.x)/c);
        let addY = (player.gravityRadius) * (Math.abs(player.y - this.y)/c);

        if (this.x > player.x && this.x < player.x + addX) {
            this.x += this.speed * 2;
        } else if (this.x < player.x && this.x > player.x - addX) {
            this.x -= this.speed * 2;    
        }

        if (this.y > player.y && this.y < player.y + addY) {
            this.y += this.speed;
        } else if (this.y < player.y && this.y > player.y - addY) {
            this.y -= this.speed;    
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

export default Enemy;