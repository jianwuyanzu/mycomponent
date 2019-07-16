/**
 * 玩家粒子
 */

import Point from './Point';
import map from './Map';
import Life from './Life'
import Particle from './Particle'

const BODYCOLOR = "rgb(30,136,168)";                // 粒子颜色
let dis = 1;                                        // 每隔一帧记录尾巴位置


class Player extends Point {
    constructor(options) {
        super(options);
        this.enemys = options.enemys;                   // 红色粒子数组
        this.color = options.color || BODYCOLOR;        // 粒子颜色
        this.radius = 5;                                // 半径
        this.livesPoint = [];                           // 尾巴中生命粒子
        this.lives = options.lives || 3;                // 生命值
        this.tail = [];                                 // 尾巴位置数组
        this.tailLen = 10;                              // 尾巴长度
        this.dead = false;                              // 是否死亡

        this.hasShield = false;                         // 是否有盾
        this.shieldRadius = 20;                         // 护盾半径
        this.shieldColor = "rgba(30,136,168,0.6)";      // 护盾颜色

        this.hasGravity = false;                        // 是否有力
        this.gravityRadius = 80;                        // 力半径
        this.gravityTime = 500;                         // 力时间

        this.particleCount = 30;                        // 粒子破碎数量
        this.particles = [];                            // 粒子破碎数组

        this.binding();
        this.initLife();
    }
    // 事件绑定
    binding(){

        let canvasElement = document.getElementsByClassName('canvas')[0];
        let self = this;
        let left = canvasElement.getBoundingClientRect().left;
        let top = canvasElement.getBoundingClientRect().top;
        // console.log(canvasElement.getBoundingClientRect())
        canvasElement.addEventListener('mousemove', (e) => {
            
            // console.log(e.clientX, e.clientY)
            // self.moveTo(e.clientX, e.clientY);
            self.moveTo(e.clientX - left, e.clientY - top);
            e.preventDefault();
        });

        canvasElement.addEventListener('touchmove', (e) => {
            let a = e.touches[0]
            // console.log(e.clientX, e.clientY)
            // self.moveTo(e.clientX, e.clientY);
            self.moveTo(a.clientX - left, a.clientY - top);
            e.preventDefault();
        });
    }
    // 设置粒子位置
    moveTo(posX, posY) {
        this.x = posX;
        this.y = posY;
    }
    // 死亡
    die() {
        this.dead = true;
    }
    // 初始化生命值
    initLife(){
        this.livesPoint = [];
        for(let i = 0; i < this.lives; i++) {
            this.livesPoint.push(new Life({}));
        }
    }
    // 增加生命值
    addLife(){
        this.livesPoint.push(new Life({}));
    }
    // 减少生命值
    loseLife(){
        this.livesPoint.shift();
    }
    //失去生命的时候身体闪烁
    flash() {
        let self = this;
        
        self.flashing = true;
        let timeout = setTimeout(function() {
            self.flashing = false;
            self.color = BODYCOLOR;
            clearTimeout(timeout);
        }, 500);
    }
    // 渲染粒子
    render(){
        let self = this;
        if(!self.dead){
            map.ctx.beginPath();
            //闪烁效果
            if (self.flashing) {
                self.color = ["#fff", BODYCOLOR][Math.round(Math.random())];
            }
            map.ctx.fillStyle = self.color;
            map.ctx.arc(self.x, self.y, self.radius, 0, Math.PI*2, false);
            map.ctx.fill();

            if (dis % 2) self.recordTail();
            dis++;

            if (self.tail.length > self.livesPoint.length*5) {
                self.renderTail();
            }

            //有护盾
            if (self.hasShield) self.renderShield();
            //有重力
            if (self.hasGravity) self.renderGravity();
            //爆炸
            if (self.particles.length) self.renderBoom();
        }
    }
    // 记录尾巴位置
    recordTail(){
        let self = this;
        self.tailLen = self.livesPoint.length*5 + 10;
        
        if (self.tail.length > self.tailLen) {
            self.tail.splice(0, self.tail.length - self.tailLen);
        }
        self.tail.push({
            x: self.x,
            y: self.y
        });
    }
    // 渲染尾巴
    renderTail(){
        let self = this;
        let tails = self.tail, prevPot, nextPot;
        map.ctx.beginPath();
        map.ctx.lineWidth = 2;
        map.ctx.strokeStyle = self.color;

        for(let i = 0; i < tails.length - 1; i++){
            prevPot = tails[i];
            nextPot = tails[i + 1];
            //保持尾巴最小长度
            prevPot.x -= 0.5;
            prevPot.y += 0.5;

            if(i == 0){
                map.ctx.moveTo(prevPot.x, prevPot.y);
            }else{
                map.ctx.lineTo(nextPot.x, nextPot.y);
            }

        }

        map.ctx.stroke();

        // console.log(self.tail)
        self.renderLife();
    }
    // 渲染生命值节点
    renderLife(){
        let self = this;

        for(let j = 1; j <= self.livesPoint.length; j++) {
            let tailIndex = j * 5;
            let life = self.livesPoint[j - 1];
            life.render(self.tail[tailIndex]);
        }
    }
    // 渲染护盾
    renderShield(){
        map.ctx.beginPath();
        map.ctx.globalCompositeOperation="source-over";
        map.ctx.fillStyle = this.shieldColor;
        map.ctx.arc(this.x, this.y, this.shieldRadius, 0, Math.PI*2, false);
        map.ctx.fill();
        map.ctx.strokeStyle = "#5DAC81";
        map.ctx.arc(this.x, this.y, this.shieldRadius, 0, Math.PI*2, false);
        map.ctx.stroke();

        this.shieldRadius -= 0.02;
        if (this.shieldRadius < 15) {
            this.shieldColor = ( this.shieldColor === "rgba(30,136,168,0.6)") ?
                                "rgba(30,136,168,0.2)" : "rgba(30,136,168,0.6)"; 
        }
        if (this.shieldRadius < 10) {
            this.hasShield = false;
            this.shieldColor = "rgba(30,136,168,0.6)";
            this.shieldRadius = 20;
        }
    }
    // 渲染力
    renderGravity(){
        map.ctx.beginPath();
        map.ctx.globalCompositeOperation="source-over";

        var gradient = map.ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.gravityRadius);
        gradient.addColorStop(0, "rgba(30,136,168,0.8)");
        gradient.addColorStop(1, "rgba(30,136,168,0)");
            
        map.ctx.fillStyle = gradient;
        map.ctx.arc(this.x, this.y, this.gravityRadius, 0, Math.PI*2, false);
        map.ctx.fill();

        if (this.gravityTime-- < 0) {
            this.hasGravity = false;
            this.gravityTime = 500;
        }
    }
    // 渲染破碎粒子
    renderBoom() {
        
        
        for (let i = 0; i < this.particles.length; i++) {
            let eachPartical = this.particles[i];
            for (let j = 0; j < eachPartical.length; j++) {
                if (eachPartical[j].destroy) {
                    eachPartical.splice(j, 1);
                    j--;
                } else {
                    eachPartical[j].render();
                    eachPartical[j].update();
                }
            }
        }    
    }
    // 使用技能
    setSkill(type){
        let self = this;
        self.skill = type;

        switch(self.skill){
            case 'shield':
                self.shieldRadius = 20;
                self.hasShield = true;
                break;
            case 'gravity':
                self.gravityTime = 500;
                self.hasGravity = true;
                break;
            case 'time':
                if(self.enemys){
                    for(let i in self.enemys){
                        self.enemys[i].speedDown(0.8);
                    }
                    let timeout = setTimeout(()=>{
                        for (let i in self.enemys) {
                            self.enemys[i].speedUp(0.8);
                        }
                        clearTimeout(timeout);
                    }, 5*1000);
                }
                break;
            case 'minimize':
                if(self.enemys){
                    for (let i in self.enemys) {
                        self.enemys[i].minimize();
                    }
                    let timeout = setTimeout(function() {
                        for (let i in self.enemys) {
                            self.enemys[i].magnify();
                        }
                        clearTimeout(timeout);
                    }, 5*1000);
                }
                break;
            case 'life':
                self.addLife();
                break;
        }
    }
    // 撞击方法
    collision(enemyX, enemyY){
        if(this.hasShield){        //判断是否有盾
            this.boom(enemyX || this.x, enemyY || this.y, "red");
        }else if(this.livesPoint.length != 0){
            this.loseLife();
            this.boom(this.x, this.y);
            this.flash();
        }else if(this.livesPoint.length == 0){
            this.boom(this.x, this.y);
        }
    }
    // 粒子破碎方法
    boom(x, y, color, size){
        let self = this;
        let eachPartical = [];
        for (let i = 0; i < self.particleCount; i++) {
            eachPartical.push(new Particle({x, y, color, size}));
        }
        self.particles.push(eachPartical);
    }

}

export default Player;