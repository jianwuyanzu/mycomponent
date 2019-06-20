/**
 * 具体时间
 */
import map from './Map'

class TimeAdd{
    // 初始化
    init(options){
        this.timeAdd_color = options.timeAdd_color;
        this.time_24h = options.time_24h;
        this.size = options.size;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
    }
    // 渲染
    render(){
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = this.time_24h ? now.getHours() : now.getHours()%12;

        if(sec < 10){ sec = '0' + sec };
        if(min < 10){ sec = '0' + min };
        if(hour < 10){ sec = '0' + hour };

        map.ctx.lineWidth = this.lineWidth;
        map.ctx.fillStyle = this.timeAdd_color;
        map.ctx.textBaseline = "middle";
        map.ctx.textAlign = "center";
        map.ctx.font = this.size/15+"px Arial";
        map.ctx.fillText(`${hour}:${min}:${sec}`, this.size/2, this.size/1.7);
    }
}

export default new TimeAdd();