class Map {
    // 初始化
    init(options){
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = options.width;
        this.height = options.width;

        this.render();
    }
    // 清理
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    // 渲染地图
    render(){
        this.clear();
        
        // 棋盘平均分为15格,每格宽度
        let w = this.width/15;

        this.ctx.strokeStyle = '#aaa';
        
        for(let i=0; i<15; i++){
            this.ctx.moveTo(w/2, w/2 + i*w);
            this.ctx.lineTo(this.width - w/2, w/2 + i*w);
            this.ctx.stroke();

            this.ctx.moveTo(w/2 + i*w, w/2);
            this.ctx.lineTo(w/2 + i*w, this.width - w/2);
            this.ctx.stroke();
        }
    }
    // 渲染棋子
    render_piece(i, j, me){
        let w = this.width/15;

        this.ctx.beginPath();
        this.ctx.arc(w/2 + i*w, w/2 + j*w, w/2 - 2, 0, 2 * Math.PI);
        this.ctx.closePath();

        let gradient = this.ctx.createRadialGradient(w/2 + i*w + 2, w/2 + j*w - 2, w/2 - 2, w/2 + i*w + 2, w/2 + j*w - 2, 0);
        if(me){
            gradient.addColorStop(0, "#0A0A0A");
            gradient.addColorStop(1, "#636766");
        }else{
            gradient.addColorStop(0, "#D1D1D1");
		    gradient.addColorStop(1, "#F9F9F9");
        }
        
        this.ctx.fillStyle = gradient;
	    this.ctx.fill();

    }
}

export default new Map();