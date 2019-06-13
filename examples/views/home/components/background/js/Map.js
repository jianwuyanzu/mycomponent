function find_random(num_one,num_two){
    return Math.random()*(num_two-num_one)+num_one;
}
/**
 * 地图类
 */

class Map {
    constructor(options){
        this.style_color = find_random(0,360);
    }
    // 初始化
    init(options) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = options.width;
        this.height = options.height;
    }
    // 清理
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    // 渲染地图
    render() {
        this.clear();
        this.style_color += 0.1;
        this.ctx.fillStyle = 'hsl('+this.style_color+',100%,10%)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default new Map();