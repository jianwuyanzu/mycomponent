/**
 * 具体时间
 */

class TimeAdd{
    // 初始化
    init(options){
        this.map = options.map;
        this.timeAdd_color = options.timeAdd_color;
        this.time_24h = options.time_24h;
        this.size = options.size;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
        this.x = options.x;
        this.y = options.y;
        this.fontSize = this.size/15;
    }
    // 渲染
    render(data){
        if(data){
            if(data.x){
                this.x = data.x;
            }
            if(data.y){
                this.y = data.y;
            }
            if(data.fontSize){
                this.fontSize = data.fontSize
            }
        }

        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = this.time_24h ? now.getHours() : now.getHours()%12;

        if(sec < 10){ sec = '0' + sec };
        if(min < 10){ min = '0' + min };
        if(hour < 10){ hour = '0' + hour };

        this.map.ctx.lineWidth = this.lineWidth;
        this.map.ctx.fillStyle = this.timeAdd_color;
        this.map.ctx.textBaseline = "middle";
        this.map.ctx.textAlign = "center";
        this.map.ctx.font = this.fontSize+"px Arial";
        this.map.ctx.fillText(`${hour}:${min}:${sec}`, this.x, this.y);
    }
}

export default new TimeAdd();