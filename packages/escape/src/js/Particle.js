/**
 * 撞击后的粒子
 */

import map from './Map';

const rand = Math.random;

class Particle{
    constructor(options) {
        this.x = options.x;                                     
        this.y = options.y;
        this.vx = -2 + 4 * rand();
        this.vy = -2 + 4 * rand();
        this.destroy = false;                                   // 是否销毁
        this.speed = 0.04;                                      // 速度
        this.size = options.size || 2;                          // 大小
        this.color = options.color || "rgb(30,136,168)";        // 颜色
        this.width = this.size + rand() * 2;                    // 宽度
        this.height = this.size + rand() * 2;                   // 高度
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.width -= this.speed;
        this.height -= this.speed;

        if (this.width < 0) {
            this.destroy = true;
        }
    }
    render() {
        map.ctx.fillStyle = this.color;
        map.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Particle;