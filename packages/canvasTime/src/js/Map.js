/**
 * 地图类
 *  */ 
class Map {
    // 初始化
    init(options){
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = options.width;
        this.height = options.height;
        this.bg_color = options.bg_color
    }
    // 清理
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    // 渲染地图
    render() {
        this.clear();
        this.ctx.fillStyle = this.bg_color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default Map;