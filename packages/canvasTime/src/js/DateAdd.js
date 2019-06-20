/**
 * 具体日期
 */
import map from './Map'

let day_arr=["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

class DateAdd{
    // 初始化
    init(options){
        this.size = options.size;
        this.dateAdd_color = options.dateAdd_color;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
    }
    // 渲染
    render(){
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth()+1;
        let year = now.getFullYear();

        if(day < 10){ day = '0' + day };
        if(month < 10){ month = '0' + month };

        map.ctx.lineWidth = this.lineWidth;
        map.ctx.fillStyle = this.dateAdd_color;
        map.ctx.textBaseline = "middle";
        map.ctx.textAlign = "center";
        map.ctx.font = this.size/20+"px Arial";
        map.ctx.fillText(`${year}/${month}/${day}`, this.size/2, this.size/1.5);
        map.ctx.fillText(day_arr[now.getDay()], this.size/2, this.size/1.4);
    }
}

export default new DateAdd();