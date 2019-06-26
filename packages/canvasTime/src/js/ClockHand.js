/**
 * 表针类
 *  */ 

class ClockHand{
    // 初始化
    init(options){
        this.map = options.map;
    }
    // 渲染
    render(options){
        // console.log(options.id, this.map)
        // debugger
        this.clockHand_color = options.clockHand_color;
        this.clockHand_point_color = options.clockHand_point_color;
        this.clockHand_secType = options.clockHand_secType;
        this.size = options.size;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
        this.clockHand_type = options.clockHand_type;
        
        let now = new Date();
        let milisec = now.getMilliseconds();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours()%12;

        
        this.render_hour(hour, min, sec, milisec);
        this.render_min(hour, min, sec, milisec);
        this.render_sec(hour, min, sec, milisec);
        this.render_point();
    }
    // 点渲染
    render_point(){
        this.map.ctx.beginPath();
        this.map.ctx.lineWidth = this.lineWidth;
        this.map.ctx.fillStyle = this.clockHand_point_color;
        this.map.ctx.strokeStyle = this.clockHand_point_color;
        this.map.ctx.arc((this.size/2), (this.size/2), this.size/80, 0, 2*Math.PI, 0);
        this.map.ctx.fill();
        this.map.ctx.closePath();
    }
    // 时针渲染
    render_hour(hour, min, sec, milisec){
        /**
         * 一圈12小时，每小时30度
         */
        this.map.ctx.lineWidth = this.lineWidth + 1;
        this.map.ctx.fillStyle = this.clockHand_color;
        this.map.ctx.strokeStyle = this.clockHand_color;
        this.map.ctx.beginPath();
        switch(this.clockHand_type){
            case 'none': this.map.ctx.moveTo((this.size/2), (this.size/2));
            this.map.ctx.arc((this.size/2), (this.size/2), this.size/4, ((2*Math.PI)/360)*((hour+min/60)-3)*30, ((2*Math.PI)/360)*((hour+min/60)-3)*30, 0);break;
            case 'border': this.map.ctx.arc((this.size/2), (this.size/2), this.size/4, ((2*Math.PI)/360)*(0-3)*30, ((2*Math.PI)/360)*((hour+min/60)-3)*30, 0);
            this.map.ctx.lineTo((this.size/2), (this.size/2));break;
        }
        this.map.ctx.stroke();
        this.map.ctx.closePath();
    }
    // 分针渲染
    render_min(hour, min, sec, milisec){
        /**
         * 一圈60分钟，每分钟6度
         */

        this.map.ctx.lineWidth = this.lineWidth;
        this.map.ctx.fillStyle = this.clockHand_color;
        this.map.ctx.strokeStyle = this.clockHand_color;
        this.map.ctx.beginPath();
        switch(this.clockHand_type){
            case 'none': this.map.ctx.moveTo((this.size/2), (this.size/2));
            this.map.ctx.arc((this.size/2), (this.size/2), this.size/3.4, ((2*Math.PI)/360)*((min+sec/60)-15)*6, ((2*Math.PI)/360)*((min+sec/60)-15)*6, 0);break;
            case 'border': this.map.ctx.arc((this.size/2), (this.size/2), this.size/3.4, ((2*Math.PI)/360)*(0-15)*6, ((2*Math.PI)/360)*((min+sec/60)-15)*6, 0);
            this.map.ctx.lineTo((this.size/2), (this.size/2));break;
        }
        this.map.ctx.stroke();
        this.map.ctx.closePath();
    }
    // 秒针渲染
    render_sec(hour, min, sec, milisec){
        let speed = sec;
        if(this.clockHand_secType){
            speed = sec+milisec/1000;
        }
        this.map.ctx.lineWidth = this.lineWidth-1;
        this.map.ctx.fillStyle = this.clockHand_color;
        this.map.ctx.strokeStyle = this.clockHand_color;
        this.map.ctx.beginPath();
        switch(this.clockHand_type){
            case 'none': this.map.ctx.moveTo((this.size/2), (this.size/2));
            this.map.ctx.arc((this.size/2), (this.size/2), this.size/3, ((2*Math.PI)/360)*(speed-15)*6, ((2*Math.PI)/360)*(speed-15)*6, 0);break;
            case 'border': this.map.ctx.arc((this.size/2), (this.size/2), this.size/3, ((2*Math.PI)/360)*(0-15)*6, ((2*Math.PI)/360)*(speed-15)*6, 0);
            this.map.ctx.lineTo((this.size/2), (this.size/2));break;
        }
        this.map.ctx.stroke();
        this.map.ctx.closePath();

        this.map.ctx.beginPath();
        this.map.ctx.moveTo((this.size/2), (this.size/2));
        this.map.ctx.arc((this.size/2), (this.size/2), this.size/15, ((2*Math.PI)/360)*(speed+15)*6, ((2*Math.PI)/360)*(speed+15)*6, 0);
        this.map.ctx.stroke();
        this.map.ctx.closePath();
    }
}

export default new ClockHand();