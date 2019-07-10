<template>
    <div class="gobang" ref="gobang">
        <canvas ref="canvas" @click="chessBoardClick($event)"></canvas>
    </div>
</template>

<script>
import map from './js/Map'
import S from './js/score'
import scorePoint from './js/evaluate_point'
import negamax from './js/negamax'

// 游戏模式 默认ai白子
let gameType = 'AI_W', gameover = false, deep = 1;
// 默认玩家先 黑
let people = 'black', me = true, computer = 'white';
// 定义二维数组存放所有落子点
let chessBoard = [];
// 定义三维数组存放所有赢的情况
let wins = [];
let count = 0;
// 赢法统计数组
let peopleWin = [], computerWin = [];
// 存放棋盘上每个点的分值
let peopleScore = [], computerScore = [];

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

    for(let i=0; i<15; i++){
        peopleScore[i] = [];
        computerScore[i] = [];
        for(let j=0; j<15; j++){
            peopleScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
}
initFun();
// console.log(wins)

// 判断一定范围内是否有子
let hasNeighbor = function(x, y, distance, count){
    let startX = x-distance;
    let endX = x+distance;
    let startY = y-distance;
    let endY = y+distance;
    for(let i = startX; i <= endX; i++){
        if(i < 0 || i > 14) continue;
        for(let j = startY; j <= endY; j++){
            if(j < 0 || j > 14) continue;
            if(i == x && j == y) continue;
            if(chessBoard[i][j] !== 0){
                count--;
                if(count <= 0) return true;
            }
        }
    }
    return false;
}
// 生成所有可以落子的点
let gen = function(role){
    let fives = [], computerfours = [], peoplefours = [], computerblockedfours = [], peopleblockedfours = [], computertwothrees = [], peopletwothrees = [], computerthrees = [], peoplethrees = [], computertwos = [], peopleputertwos = [], neighbors = [];
    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){
            if(chessBoard[i][j] == 0){
                let scorePeople = peopleScore[i][j];
                let scoreComputer = computerScore[i][j];
                let maxScore = Math.max(scorePeople, scoreComputer);
                // if(maxScore < S.THREE) continue;
                // let maxScore = scorePeople + scoreComputer;

                let p = {};
                p.i = i;
                p.j = j;
                p.scorePeople = scorePeople;
                p.scoreComputer = scoreComputer;
                p.maxScore = maxScore;
                p.role = role;

                if(scoreComputer >= S.FIVE){
                    fives.push(p);
                }else if(scorePeople >= S.FIVE){
                    fives.push(p);
                }else if(scoreComputer >= S.FOUR){
                    computerfours.push(p);
                }else if(scorePeople >= S.FIVE){
                    peoplefours.push(p);
                }else if(scoreComputer >= S.BLOCKED_FOUR){
                    computerblockedfours.push(p);
                }else if(scorePeople >= S.BLOCKED_FOUR){
                    peopleblockedfours.push(p);
                }else if(scoreComputer >= 2*S.THREE){
                    computertwothrees.push(p);
                }else if(scorePeople >= 2*S.THREE){
                    peopletwothrees.push(p);
                }else if(scoreComputer >= S.THREE){
                    computerthrees.push(p);
                }else if(scorePeople >= S.THREE){
                    peoplethrees.push(p);
                }else if(scoreComputer >= S.TWO){
                    computertwos.push(p);
                }else if(scorePeople >= S.TWO){
                    peopleputertwos.push(p);
                }else if(scoreComputer >= S.BLOCKED_ONE || scorePeople >= S.BLOCKED_ONE){
                    // console.log(p)
                    neighbors.push(p);
                }
            }
        }
    }

    // 如果有五，必杀
    if(fives.length) return fives;
    // 自己能活四，则直接活四，不考虑冲四
    if(role == computer && computerfours.length) return computerfours;
    if(role == people && peoplefours.length) return peoplefours;
    // 对面有活四冲四，自己冲四都没，则只考虑对面活四 （此时对面冲四就不用考虑了)
    if(role == computer && peoplefours.length && !computerblockedfours.length) return peoplefours;
    if(role == people && computerfours.length && !peopleblockedfours.length) return computerfours;
    // 对面有活四自己有冲四，则都考虑下
    let fours = role == computer ? computerfours.concat(peoplefours) : peoplefours.concat(computerfours);
    let blockedfours = role == computer ? computerblockedfours.concat(peopleblockedfours) : peopleblockedfours.concat(computerblockedfours);
    if(fours.length) return fours.concat(blockedfours);

    let result = [];
    if(role == computer){
        result = [...computertwothrees, ...peopletwothrees, ...computerblockedfours, ...peopleblockedfours, ...computerthrees, ...peoplethrees];
    }
    if(role == people){
        result = [...peopletwothrees, ...computertwothrees, ...peopleblockedfours, ...computerblockedfours, ...peoplethrees, ...computerthrees];
    }

    if(computertwothrees.length || peopletwothrees.length){
        return result;
    }

    if(computertwos.length || peopleputertwos.length){
        result = [...result, ...computertwos, ...peopleputertwos];
    }else{
        result = [...result, ...neighbors];
    }
    return result;
}
// 棋面估分
let evaluate = function(role){
    df();
    let computerMaxScore = 0;
    let peopleMaxScore = 0;

    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){
            if(chessBoard[i][j] == computer){
                // debugger
                computerMaxScore += fixScore(computerScore[i][j]);
            }else if(chessBoard[i][j] == people){
                peopleMaxScore += fixScore(peopleScore[i][j]);
            }
        }
    }
    // console.log(computerMaxScore, peopleMaxScore)

    return (role == computer ? 1 : -1) * (computerMaxScore - peopleMaxScore)
}
let fixScore = function(type){
    return type;
}

let df = function(){
    for(let i=0; i<15; i++){
        for(let j=0; j<15; j++){
            if(chessBoard[i][j] == 0){      // 该点无子
                if(hasNeighbor(i, j, 2, 1)){    // 该点附件有子才打分
                    peopleScore[i][j] = scorePoint(i, j, people, chessBoard);
                    computerScore[i][j] = scorePoint(i, j, computer, chessBoard);
                }
            }else if(chessBoard[i][j] == computer){ // 对电脑打分，玩家此位置分数为0
                peopleScore[i][j] = 0;
                // computerScore[i][j] = 0;
            }else if(chessBoard[i][j] == people){   // 对玩家打分 电脑此位置分数为0
                computerScore[i][j] = 0;
                // peopleScore[i][j] = 0;
            }
            // 判断电脑落子的最佳处
            // if(peopleScore[i][j] > max){
            //     max = peopleScore[i][j];
            //     u = i;
            //     v = j;
            // }else if(peopleScore[i][j] == max){
            //     if(computerScore[i][j] > computerScore[u][v]){
            //         u = i;
            //         v = j;
            //     }
            // }
            // if(computerScore[i][j] > max){
            //     max = computerScore[i][j];
            //     u = i;
            //     v = j;
            // }else if(computerScore[i][j] == max){
            //     if(peopleScore[i][j] > peopleScore[u][v]){
            //         u = i;
            //         v = j;
            //     }
            // }
        }
    }
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
            // 落子的价值及坐标
            let max = 0, u = 0, v = 0;
            
            // 为所有赢法打分
            df();
            // console.log(computerScore)
            // console.log(peopleScore)
            // debugger
            let a = negamax(computer, deep, chessBoard, gen, evaluate);
            u = a.i;
            v = a.j;
            // console.log(a);
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
