/**
 * 给某一点打分
 *   */
import score from './score'

 let s = function(x, y, role, chessBoard){
    let result = 0;
    let empty = -1, count = 0, block = 0, secondCount = 0;

    function reset(){
        empty = -1;
        count = 0;
        block = 0;
        secondCount = 0;
    }
    // if(x == 5 && y == 6 && role == 'white'){
    //     debugger
    // }

    // -
    reset();
    for(let i=x+1; true; i++){
        if(i >= 15){
            block++;
            break;
        }
        let point = chessBoard[i][y];
        if(point == 0){ // 棋盘上这个点无子
            if(empty == -1 && i<14 && chessBoard[i+1][y] == role){  // 当前没记录过空点且该点不在棋盘边缘且旁边的点有子与当前角色是相同的
                empty = count;
                continue;
            }else{
                break;
            }
        }
        if(point == role){  // 棋盘上这个点有子且是当前角色的子
            count ++;
            continue;
        }else{
            block++;
            break;
        }
        
    }
    for(let i=x-1; true; i--){
        if(i < 0){
            block++;
            break;
        }
        let point = chessBoard[i][y];
        if(point == 0){
            if(empty == -1 && i>0 && chessBoard[i-1][y] == role){
                empty = 0;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            secondCount ++;
            empty !== -1 && empty ++;
            continue;
        }else{
            block ++;
            break;
        }
    }
    count+= secondCount;
    result += countToScore(count, block, empty);

    // |
    reset();
    for(let i=y+1; true; i++){
        if(i >= 15){
            block++;
            break;
        }
        let point = chessBoard[x][i];
        if(point == 0){
            if(empty == -1 && i<14 && chessBoard[x][i+1] == role){
                empty = count;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            count++;
            continue;
        }else{
            block++;
            break;
        }
    }
    for(let i=y-1; true; i--){
        if(i < 0){
            block++;
            break;
        }
        let point = chessBoard[x][i];
        if(point == 0){
            if(empty == -1 && i>0 && chessBoard[x][i-1] == role){
                empty = 0;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            secondCount++;
            empty !== -1 && empty ++;
            continue;
        }else{
            block++;
            break;
        }
    }
    count+= secondCount;
    result += countToScore(count, block, empty);

    // \
    reset();
    for(let i=1; true; i++){
        let px = x+i, py = y+i;
        if(px >=15 || py >= 15){
            block++;
            break;
        }
        let point = chessBoard[px][py];
        if(point == 0){
            if(empty == -1 && (px < 14 && py < 14) && chessBoard[px+1][py+1] == role){
                empty = count;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            count++;
            continue;
        }else{
            block++;
            break;
        }
    }
    for(let i=1; true; i++){
        let px = x-i, py = y-i;
        if(px < 0 || py < 0){
            block++;
            break;
        }
        let point = chessBoard[px][py];
        if(point == 0){
            if(empty == -1 && (px > 0 && py > 0) && chessBoard[px-1][py-1] == role){
                empty = 0;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            secondCount++;
            empty !== -1 && empty ++;
            continue;
        }else{
            block++;
            break;
        }
    }
    count+= secondCount;
    result += countToScore(count, block, empty);

    // /
    reset();
    for(let i=1; true; i++){
        let px = x+i, py = y-i;
        if(px >=15 || py >= 15 || px < 0 || py < 0){
            block++;
            break;
        }
        let point = chessBoard[px][py];
        if(point == 0){
            if(empty == -1 && (px < 14 && py < 14) && chessBoard[px+1][py-1] == role){
                empty = count;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            count++;
            continue;
        }else{
            block++;
            break;
        }
    }
    for(let i=1; true; i++){
        let px = x-i, py = y+i;
        if(px >=15 || py >= 15 || px < 0 || py < 0){
            block++;
            break;
        }
        let point = chessBoard[px][py];
        if(point == 0){
            if(empty == -1 && (px > 0 && py > 0) && chessBoard[px-1][py+1] == role){
                empty = 0;
                continue;
            }else{
                break;
            }
        }
        if(point == role){
            secondCount++;
            empty !== -1 && empty ++;
            continue;
        }else{
            block++;
            break;
        }
    }
    count+= secondCount;
    result += countToScore(count, block, empty);

    return result;
 }

let countToScore = function(count, block, empty){
    // 没有空位
    if(empty <= 0){
        let add = 0;
        if(empty == -1){
            add = 10;
        }
        if(count >= 5) return score.FIVE;
        if(block == 0){
            switch(count){
                case 1: return score.ONE + add;
                case 2: return score.TWO + add;
                case 3: return score.THREE + add;
                case 4: return score.FOUR + add;
            }
        }
        if(block == 1){
            switch(count){
                case 1: return score.BLOCKED_ONE + add;
                case 2: return score.BLOCKED_TWO + add;
                case 3: return score.BLOCKED_THREE + add;
                case 4: return score.BLOCKED_FOUR + add;
            }
        }
    }
    //第一个是空位
    if(empty === 1 || empty == count-1){
        if(count >= 6){
            return score.FIVE
        }
        if(block === 0){
            switch(count){
                case 2: return score.TWO;
                case 3: return score.THREE;
                case 4: return score.BLOCKED_FOUR;
                case 5: return score.FOUR;
            }
        }
        if(block === 1){
            switch(count){
                case 2: return score.BLOCKED_TWO;
                case 3: return score.BLOCKED_THREE;
                case 4: return score.BLOCKED_FOUR;
                case 5: return score.BLOCKED_FOUR;
            }
        }
    }
    // 第二个是空位
    if(empty === 2 || empty == count-2){
        if(count >= 7){
            return score.FIVE;
        }
        if(block === 0){
            switch(count){
                case 3: return score.THREE;
                case 4: 
                case 5: return score.BLOCKED_FOUR;
                case 6: return score.FOUR;
            }
        }
    
        if(block === 1){
            switch(count){
                case 3: return score.BLOCKED_THREE;
                case 4: return score.BLOCKED_FOUR;
                case 5: return score.BLOCKED_FOUR;
                case 6: return score.FOUR;
            }
        }
    
        if(block === 2){
            switch(count){
                case 4:
                case 5:
                case 6: return score.BLOCKED_FOUR;
            }
        }
    }
    // 第三个是空位
    if(empty === 3 || empty == count-3){
        if(count >= 8){
            return score.FIVE;
        }
        if(block === 0){
            switch(count){
                case 4:
                case 5: return score.THREE;
                case 6: return score.BLOCKED_FOUR;
                case 7: return score.FOUR;
            }
        }
    
        if(block === 1){
            switch(count){
                case 4:
                case 5:
                case 6: return score.BLOCKED_FOUR;
                case 7: return score.FOUR;
            }
        }
    
        if(block === 2){
            switch(count){
                case 4:
                case 5:
                case 6:
                case 7: return score.BLOCKED_FOUR;
            }
        }
    }
    // 第四个是空位
    if(empty === 4 || empty == count-4){
        if(count >= 9){
            return score.FIVE;
        }
        if(block === 0){
            switch(count){
                case 5:
                case 6:
                case 7:
                case 8: return score.FOUR;
            }
        }
    
        if(block === 1){
            switch(count){
                case 4:
                case 5:
                case 6:
                case 7: return score.BLOCKED_FOUR;
                case 8: return score.FOUR;
            }
        }
    
        if(block === 2){
            switch(count){
                case 5:
                case 6:
                case 7:
                case 8: return score.BLOCKED_FOUR;
            }
        }
    }
    // 第五个是空位
    if(empty === 5 || empty == count-5){
        return score.FIVE
    }

    return 0;
}

export default s;