import S from "./score"
import math from './math'

var MAX = S.FIVE*10
var MIN = -1*MAX

var count=0,  //每次思考的节点数
    PVcut,
    ABcut,  //AB剪枝次数
    cacheCount=0, //zobrist缓存节点数
    cacheGet=0 //zobrist缓存命中数量

let r = function(deep, alpha, beta, role, step, steps, spread, chessBoard, evaluate, gen){
    
    let _e = evaluate(role);
    
    let leaf = {
        score: _e,
        step: step,
        steps: steps
    }
    if(deep <= 0){
        return leaf
    }
    let best = {
        score: MIN,
        step: step,
        steps: steps
    }
    let points = gen(role);
    // console.log(points)
    if (!points.length) return leaf;
    for(let i=0; i<points.length; i++){
        let p = points[i];
        chessBoard[p.i][p.j] = role;
        let _deep = deep - 1;
        let _spread = spread;
        steps.push(p);
        let v = r(_deep, -beta, -alpha, role == 'white' ? 'black' : 'white', step+1, [...steps], _spread, chessBoard, evaluate, gen);
        v.score *= -1;
        chessBoard[p.i][p.j] = 0;

        if(v.score > best.score) {
            best = v
        }
    }
    return best
}

let negamax = function(candidates, role, deep, alpha, beta, chessBoard, evaluate, gen){
    for(let i = 0; i < candidates.length; i++){
        let p = candidates[i];
        chessBoard[p.i][p.j] = role;
        let steps = [p]
        let v = r(deep-1, -beta, -alpha, role == 'white' ? 'black' : 'white', 1, [...steps], 0, chessBoard, evaluate, gen);
        v.score *= -1;
        chessBoard[p.i][p.j] = 0;
        alpha = Math.max(alpha, v.score);
        p.v = v
    }
    return alpha;
}

let deeping = function(candidates, role, deep, chessBoard, evaluate, gen){

    // negamax(candidates, role, deep, MIN, MAX, chessBoard, evaluate, gen);

    candidates.sort(function (a,b) {
        return -(a.maxScore - b.maxScore);
    })
    console.log(candidates)
    let result = candidates[0];
    if(candidates[1] && candidates[0].maxScore == candidates[1].maxScore && candidates[0].scorePeople > candidates[0].scoreComputer){
        if(candidates[0].scorePeople > candidates[1].scorePeople){
            result = candidates[0];
        }else{
            result = candidates[1];
        }
    }

    return result;
}

let deepAll = function(role, deep, chessBoard, gen, evaluate){
    const candidates = gen(role);
    return deeping(candidates, role, deep, chessBoard, evaluate, gen);
}

export default deepAll;