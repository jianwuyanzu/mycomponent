<template>
    <div class="escape">
        <canvas class="canvas" ref="canvas"></canvas>
        <div class="statusBar">
            <span class="statusBar_life">额外生命：{{life}}</span>
            <span class="statusBar_time">时间：{{time}}s</span>
        </div>
        <div class="panel" :class="{panel_gameStart: state == 1}">
            <div class="gameStart">
                <p v-if="state == 0">ESCAPE GAME</p>
                <p v-if="state == 2">GAME OVER</p>
                <div v-if="state == 0" class="btn" @click="startGame()">start</div>
                <div v-if="state == 2" class="btn" @click="resetGame()">play again</div>
            </div>
        </div>
    </div>
</template>

<script>
import map from './js/Map'
import Enemy from './js/Enemy';
import Player from './js/Player';
import Skill from './js/Skill';

let gameStart = false;      // 是否开始游戏

let player;                 // 玩家粒子
let enemys = [];            // 红色粒子
const enemyCount = 30;      // 红色粒子数量
let skillPoint;             // 技能粒子


const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export default {
    name: 'escape',
    data(){
        return{
            state: 0,       // 0: 游戏未开始 1: 游戏已开始 2: 游戏已结束
            life: 0,         // 生命值
            time: 0         // 时间
        }
    },

    methods: {
        // 地图初始化
        mapInit(){
            const canvas = this.$refs.canvas;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            map.init({
                canvas,
                width: canvas.clientWidth,
                height: canvas.clientHeight
            });
        },
        // 添加红色粒子
        createEnemy(numEnemy){
            enemys = [];
            for (let i = 0; i < numEnemy; i++) {
                const x = Math.random() * map.width + map.width;
                const y = Math.random() * map.height;
                enemys.push(new Enemy({x, y}));
            }
            
        },
        // 添加技能粒子
        createSkill(){
            const x = Math.random() * map.width + map.width;
            const y = Math.random() * map.height;
            const type = ['shield', 'gravity', 'time', 'minimize', 'life'][Math.floor(Math.random() * 5)];
            // const type = ['shield', 'gravity', 'time', 'minimize', 'life'][0];

            skillPoint = new Skill({x, y, type});
        },
        // 添加玩家粒子
        createPlayer(){
            player = new Player({
                x: map.width / 5,
                y: map.height * 0.6,
                enemys: enemys  // 玩家类中能获取到红色粒子数组
            });
            this.life = player.livesPoint.length;
        },
        // 所有粒子初始化
        initRoles(){
            this.createEnemy(enemyCount);
            this.createPlayer();
            this.createSkill();
        },
        // 页面初始化动画
        beforeAnimate(){
            this.createEnemy(enemyCount);
            (function animate() {
                if (gameStart) return;
                map.render();
                
                for (let i = 0; i < enemys.length; i++) {
                    enemys[i].render();
                    enemys[i].update();
                }
                raf(animate);
            })();
        },
        // 计时器
        initTimer(){
            let self = this;
            self.time = 0;
            try {
                clearTimeout(timer);
            } catch (error) {
                
            }
            
            let time = function(){
                if(self.state == 2){
                    return false;
                }
                var timer = setTimeout(()=>{
                    //每隔10秒加速一次
                    self.time++;
                    if(self.time%10 == 0){
                        for (let i = 0; i < enemys.length; i++) {
                            enemys[i].speedUp();
                        }
                    }
                    clearTimeout(timer);
                    time();
                }, 1000)
            }
            time();
        },
        // 开始游戏
        startGame(){
            gameStart = true;
            this.state = 1;
            this.initRoles();
            this.initTimer();
            this.gameStartAnimate();
        },
        // 重玩
        resetGame(){
            gameStart = true;
            this.state = 1;
            this.initRoles();
            this.initTimer();
        },
        // 开始游戏后动画
        gameStartAnimate(){
            // 地图渲染
            map.render();

            // 技能粒子撞击判断
            if(this.collision(skillPoint, player)){
                if(!skillPoint.isEated){
                    player.setSkill(skillPoint.type);
                    skillPoint.use();
                }
            }

            // 红色粒子渲染
            for (let i = 0; i < enemys.length; i++) {
                enemys[i].render();
                enemys[i].update();

                if(!player.dead && this.collision(enemys[i], player) && !enemys[i].collision){
                    // 判断是否有力
                    if(player.hasGravity) {
                        enemys[i].escape(player);
                    }else{
                        // 判断是否有盾
                        if(player.hasShield) {
                            player.collision(
                                enemys[i].x,
                                enemys[i].y
                            );
                            enemys.splice(i, 1);
                            enemys.push(new Enemy({
                                x: Math.random() * map.width + map.width,
                                y: Math.random() * map.height
                            }));
                        }else if(player.livesPoint.length == 0){      // 判断生命值
                            player.die();
                            // 游戏结束
                            this.state = 2;
                        }else{
                            player.collision(
                                enemys[i].x,
                                enemys[i].y
                            );
                            enemys[i].collision = true;
                        }
                    }
                    
                }
            }
            // 生命值赋值
            this.life = player.livesPoint.length;
            // 玩家粒子渲染
            player.render();
            // 技能粒子渲染
            skillPoint.render();
            skillPoint.update();

            raf(this.gameStartAnimate);
        },
        // 碰撞检测
        collision(enemy, player){
            const disX = player.x - enemy.x;
            const disY = player.y - enemy.y;
            // Math.hypot() 两数的平方和再开方 相当于求直角三角形斜边
            if (player.hasGravity) {
                return Math.hypot(disX, disY) < (player.gravityRadius + enemy.radius);
            } else if (player.hasShield) {
                return Math.hypot(disX, disY) < (player.shieldRadius + enemy.radius);
            }
            return Math.hypot(disX, disY) < (player.radius + enemy.radius);
        }
    },
    mounted(){
        this.mapInit();
        this.beforeAnimate();
    }
}
</script>

<style scoped lang="scss">
.btn{
    border: 1px solid #ffffff;
    border-radius: 10px;
    width: 100px;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
}
.escape{
    overflow: hidden;
    font-size: 16px;
    width: 100%;
    height: 100%;
    position: relative;
    .canvas{
        width: 100%;
        height: 100%;
    }
    .statusBar{
        position: absolute;
        top: 0;
        color: #ffffff;
        >span{
            margin-left: 10px;
            &.statusBar_life{

            }
            &.statusBar_time{

            }
        }
    }
    .panel{
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        margin: auto;
        max-height: 200px;
        background-color: rgba(255, 255, 255, 0.5);
        transition: all 0.5s;
        overflow: hidden;
        transform-origin: 0 0;
        &.panel_gameStart{
            // max-height: 0px;
            transform-origin: 100% 0;
            transform: scale(0, 0);
        }
        .gameStart{
            width: 100%;
            height: 100%;
            text-align: center;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            >p{
                font-size: 36px;
            }
        }
    }
}
</style>
