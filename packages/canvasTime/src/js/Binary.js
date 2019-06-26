class Binary {
    init(options){
        this.map = options.map;
    }
    render(options){
        this.binary_color = options.binary_color;
        this.size = options.size;
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
        this.fontSize = this.size/8;
        this.time_24h = options.time_24h;

        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = this.time_24h ? now.getHours() : now.getHours()%12;;

        let hourstr = hour.toString(2).padStart(6, 0), 
            minstr = min.toString(2).padStart(6, 0), 
            secstr = sec.toString(2).padStart(6, 0);
        // console.log(hourstr, minstr, secstr)

        this.map.ctx.lineWidth = this.lineWidth;
        this.map.ctx.fillStyle = this.binary_color;
        this.map.ctx.textBaseline = "middle";
        this.map.ctx.textAlign = "center";
        this.map.ctx.font = this.fontSize+"px Courier New";

        this.map.ctx.fillText(hourstr, (this.size/2), this.size/6);
        this.map.ctx.fillText(minstr, (this.size/2), this.size/6*2);
        this.map.ctx.fillText(secstr, (this.size/2), this.size/6*3);

    }
}

export default new Binary();