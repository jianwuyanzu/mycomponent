<template>
    <div class="gobang" ref="gobang">
        <canvas ref="canvas" @click="chessBoardClick($event)"></canvas>
    </div>
</template>

<script>
import map from './js/Map'

// 游戏模式 默认ai白子
let gameType = 'AI_W', gameover = false;
// 默认玩家先 黑
let people = 'black', me = true, computer = 'white';
// 定义二维数组存放所有落子点
let chessBoard = [];
// 定义三维数组存放所有赢的情况
let wins = [];
let count = 0;
// 赢法统计数组
let peopleWin = [], computerWin = [];

let initFun = function(){
    gameover = false;
    me = true;
    chessBoard = [];
    wins = [];
    count = 0;
    peopleWin = [];
    computerWin = [];

    for(let i=0; i<15; i++){
        chessBoard[i] = [];
        for(let j=0; j<15; j++){
            chessBoard[i][j] = 0;
        }
    }

    for(let i=0; i<15; i++){
        wins[i] = [];
        for(let j=0; j<15; j++){
            wins[i][j] = {};
        }
    }
    // 横线
    for(let i=0; i<15; i++){
        for(let j=0; j<11; j++){
            for(let k=0; k<5; k++){
                wins[i][j+k][count] = true;
            }
            count++;
        }
    }
    // 竖线
    for(let i=0; i<15; i++){
        for(let j=0; j<11; j++){
            for(let k=0; k<5; k++){
                wins[j+k][i][count] = true;
            }
            count++;
        }
    }
    //斜线
    for(let i=0; i<11; i++){
        for(let j=0; j<11; j++){
            for(let k=0; k<5; k++){
                wins[i+k][j+k][count] = true;
            }
            count++;
        }
    }
    //反斜线
    for(let i=0; i<11; i++){
        for(let j=14; j>3; j--){
            for(let k=0; k<5; k++){
                wins[i+k][j-k][count] = true;
            }
            count++;
        }
    }

    for(let i=0; i<count; i++){
        peopleWin[i] = 0;
        computerWin[i] = 0;
    }
}
initFun();
// console.log(wins)

// 打分函数
let getScore = function(piece, type, x, y){
    if(piece>0 && piece<5){
        let score = 10;
        if(type == computer){
            score = 15;
        }
        score = score*Math.pow(piece,piece);

        if(piece == 4){
            score += 1000;
        }else if(piece == 3){
            score += 500;
        }

        return score;
    }
    return 0;
}


export default {
    name: 'Gobang',
    props: {
        
    },
    data(){
        return{
            
        }
    },
    methods: {
        // 游戏初始化
        initGame(){
            initFun();
            switch(gameType){
                case 'NO_AI':;
                case 'AI_W': people = 'black'; me = true; computer = 'white';break;
                case 'AI_B': people = 'white'; me = false; computer = 'black';break;
            }
            this.initMap();
        },
        // 棋盘初始化
        initMap(){
            let gobang = this.$refs.gobang;
            let canvas = this.$refs.canvas;
            canvas.width = gobang.clientWidth;
            canvas.height = gobang.clientWidth;

            map.init({
                canvas: canvas,
                width: gobang.clientWidth
            })
        },
        // 落子
        oneStep(i, j, me){
            map.render_piece(i, j, me);
        },
        // 棋盘点击事件
        chessBoardClick(e){
            if(gameover) return;
            let gobang = this.$refs.gobang;

            let x = e.offsetX, y = e.offsetY, w = gobang.clientWidth/15;
            let i = Math.floor(x/w), j = Math.floor(y/w);
            if(chessBoard[i][j] == 0){
                this.oneStep(i, j, me);
                if(me){
                    chessBoard[i][j] = people;
                }else{
                    chessBoard[i][j] = computer;
                }

                for(let k=0; k<count; k++){
                    if(wins[i][j][k]){
                        peopleWin[k]++;
                        computerWin[k] = 6;
                        if(peopleWin[k] == 5){
                            console.log(`${people} win`);
                            gameover = true;
                        }
                    }
                }
                if(!gameover){
                    me = !me;
                    if(gameType != 'NO_AI'){
                        this.computerAI();
                    }
                }
            }
        },
        // AI
        computerAI(){
            // 存放棋盘上每个点的分值
            let peopleScore = [], computerScore = [];
            // 落子的价值及坐标
            let max = 0, u = 0, v = 0;
            for(let i=0; i<15; i++){
                peopleScore[i] = [];
                computerScore[i] = [];
                for(let j=0; j<15; j++){
                    peopleScore[i][j] = 0;
                    computerScore[i][j] = 0;
                }
            }
            // 为所有赢法打分
            for(let i=0; i<15; i++){
                for(let j=0; j<15; j++){
                    if(chessBoard[i][j] == 0){      // 该点无子
                        for(let k=0; k<count; k++){     // 遍历所有赢法
                            if(wins[i][j][k]){
                                // switch(peopleWin[k]){
                                //     case 1: peopleScore[i][j] += 200;break;
                                //     case 2: peopleScore[i][j] += 400;break;
                                //     case 3: peopleScore[i][j] += 2000;break;
                                //     case 4: peopleScore[i][j] += 10000;break;
                                // }

                                // switch(computerWin[k]){
                                //     case 1: computerScore[i][j] += 220;break;
                                //     case 2: computerScore[i][j] += 420;break;
                                //     case 3: computerScore[i][j] += 4000;break;
                                //     case 4: computerScore[i][j] += 20000;break;
                                // }
                                peopleScore[i][j] += getScore(peopleWin[k], people, i, j);
                                computerScore[i][j] += getScore(computerWin[k], computer, i, j);
                            }
                        }
                        // 判断电脑落子的最佳处
                        if(peopleScore[i][j] > max){
                            max = peopleScore[i][j];
                            u = i;
                            v = j;
                        }else if(peopleScore[i][j] == max){
                            if(computerScore[i][j] > computerScore[u][v]){
                                u = i;
                                v = j;
                            }
                        }

                        if(computerScore[i][j] > max){
                            max = computerScore[i][j];
                            u = i;
                            v = j;
                        }else if(computerScore[i][j] == max){
                            if(peopleScore[i][j] > peopleScore[u][v]){
                                u = i;
                                v = j;
                            }
                        }
                    }
                }
            }
            // console.log(computerScore)
            // console.log(peopleScore)
            // debugger
            this.oneStep(u, v, me);
            chessBoard[u][v] = computer;

            for(let k=0; k<count; k++){
                // debugger
                if(wins[u][v][k]){
                    computerWin[k]++;
                    peopleWin[k] = 6;
                    if(computerWin[k] == 5){
                        console.log(`${computer} win`);
                        gameover = true;
                    }
                }
            }
            if(!gameover){
                me = !me;
            }
        }
    },
    mounted(){
        this.initGame();
    }
}
</script>

<style scoped lang="scss">
.gobang{
    width: 100%;
    >canvas{
        box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
        cursor: pointer;
    }
}
</style>
