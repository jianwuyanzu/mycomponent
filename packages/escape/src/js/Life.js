/**
 * 尾巴中的生命粒子
 */

import map from './Map';
import Point from './Point';

class Life extends Point {

    constructor(options) {
        super(options);
    }

    render(pos) {
        let self = this;
        
        map.ctx.beginPath();
        map.ctx.fillStyle = self.color;
        map.ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI, false);
        map.ctx.fill();
    }
}

export default Life;