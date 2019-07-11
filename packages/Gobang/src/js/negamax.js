import S from "./score"
import math from './math'
let MAX = S.FIVE*10
let MIN = -1*MAX

let r = function(deep, alpha, beta, role, steps, chessBoard, gen, evaluate){
    let _e = evaluate(role);
    let leaf = {
        score: _e,
        steps: steps
    }
    if(deep <= 0 || math.greatOrEqualThan(_e, S.FIVE) || math.littleOrEqualThan(_e, -S.FIVE)){
        return leaf
    }

    let best = {
        score: MIN,
        steps: steps
    }
    let points = gen(role);
    if (!points.length) return leaf;
    for(let i=0; i<points.length; i++){
        let p = points[i];
        chessBoard[p.i][p.j] = role;
        let _deep = deep-1;
        let _steps = steps.slice(0);
        _steps.push(p);
        let v = r(deep-1, -beta, -alpha, role == 'white' ? 'black' : 'white', [...steps], chessBoard, gen, evaluate);
        chessBoard[p.i][p.j] = 0;
        v.score *= -1;
        if(v.score > best.score) {
            best = v
        }

        if(math.greatOrEqualThan(v.score, beta)){
            v.score = MAX-1;
            return v;
        }
    }
    return best;
}

let negamax = function(candidates, role, deep, chessBoard, gen, alpha, beta, evaluate){
    for(let i=0;i<candidates.length;i++){
        let p = candidates[i];
        chessBoard[p.i][p.j] = role;
        let steps = [p];
        let v = r(deep-1, -beta, -alpha, role == 'white' ? 'black' : 'white', [...steps], chessBoard, gen, evaluate);
        chessBoard[p.i][p.j] = 0;
        v.score *= -1;
        p.v = v;
    }
}

let deeping = function(candidates, role, deep, chessBoard, gen, MIN, MAX, evaluate){

    let bestScore;
    // for(let i=2; i<=deep; i+=2){
    //     negamax(candidates, role, i, chessBoard, gen, MIN, MAX, evaluate)
    // }

    candidates.sort(function(a, b){
        return b.maxScore - a.maxScore;
    })
    console.log(candidates)
    let result = candidates[0];

    return result;
}

let deepAll = function(role, deep, chessBoard, gen, evaluate){
    const candidates = gen(role);
    return deeping(candidates, role, deep, chessBoard, gen, evaluate);
}

export default deepAll;