/**
 * 表盘
 */
import map from './Map';

class Indicator{
    // 初始化
    init(options){
        this.lineWidth = this.size/100 > 1 ? this.size/100 : 1;
        this.indicate_color = options.indicate_color;
        this.size = options.size;
    }
    // 渲染
    render(){
        map.ctx.lineWidth = this.lineWidth;
        map.ctx.strokeStyle = this.indicate_color;

        let angle = 12;
        for(let a=0; a<angle; a++){
            /**
             *  r为弧度值 把圆分成12分 每份30度 0.523为30度的弧度值
             *  弧度值计算公式为 ((2*pi)/360)*角度
             *  圆心(a, b)圆上每个点的坐标 (a+Math.sin(弧度值)*半径, b+Math.cos(弧度值)*半径)
             * */ 
            let r=parseInt(a)* ((2*Math.PI)/360)*(360/angle);
            let x=Math.sin(r);
            let y=Math.cos(r);

            let ekstra = 0;
            if(a%3 == 0){
                ekstra = this.size/50;
            }

            map.ctx.beginPath();
            map.ctx.moveTo(x*(this.size/3+ekstra)+(this.size/2),y*(this.size/3+ekstra)+(this.size/2));
            map.ctx.lineTo(x*this.size/3.25+(this.size/2),y*this.size/3.25+(this.size/2));
            map.ctx.stroke();
            map.ctx.fill();
            map.ctx.closePath();
        }
    }
}

export default new Indicator();