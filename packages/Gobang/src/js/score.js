/*
 * 棋型表示
 * 用一个6位数表示棋型，从高位到低位分别表示
 * 连五，活四，眠四，活三，活二/眠三，活一/眠二, 眠一
 */

 export default {
    FIVE: 10000000,
    FOUR: 100000,
    BLOCKED_FOUR: 10000,
    THREE: 1000,
    BLOCKED_THREE: 100,
    TWO: 100,
    BLOCKED_TWO: 10,
    ONE: 10,
    BLOCKED_ONE: 1,
 }