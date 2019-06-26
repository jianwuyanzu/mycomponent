/**
 * 具体日期
 */

let day_arr=["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];

class DateAdd{
    // 初始化
    init(options){
        this.map = options.map;
        this.size = options.size;
        this.dateAdd_color = options.dateAdd_color;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
        this.x = options.x;
        this.y = options.y;
        this.fontSize = this.size/20;
    }
    // 渲染
    render(data){
        if(data && data.x && data.y){
            if(data.x){
                this.x = data.x;
            }
            if(data.y){
                this.y = data.y;
            }
            if(data.fontSize){
                this.fontSize = data.fontSize;
            }
        }

        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth()+1;
        let year = now.getFullYear();

        if(day < 10){ day = '0' + day };
        if(month < 10){ month = '0' + month };

        this.map.ctx.lineWidth = this.lineWidth;
        this.map.ctx.fillStyle = this.dateAdd_color;
        this.map.ctx.textBaseline = "middle";
        this.map.ctx.textAlign = "center";
        this.map.ctx.font = this.fontSize+"px Arial";
        this.map.ctx.fillText(`${year}/${month}/${day}`, this.x, this.y);
        this.map.ctx.fillText(day_arr[now.getDay()], this.x, this.y + 11);
    }
}

export default new DateAdd();