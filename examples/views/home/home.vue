<template>
    <div class="home customScrollbar">
        <background class="home_back"></background>
        <el-switch
            class="switch"
            v-model="homeType"
            inactive-color="#ff4949"
            active-text="简历版"
            inactive-text="交友版（相亲版）">
        </el-switch>
        <div class="main main_jl" :class="{active: homeType}">
            <div class="us">
                <div class="info">
                    <p>姓名：<span>janwuyanzu</span></p>
                    <p>年龄：<span>24</span>岁</p>
                    <p>所在城市：<span>上海</span></p>
                </div>
                <div class="head">
                    <img src="./img/head.png">
                </div>
            </div>
        </div>
        <div class="main main_xq" :class="{active: !homeType}">
            <div class="us">
                <div class="info">
                    <p>姓名：<span>janwuyanzu</span></p>
                    <p>年龄：<span>24</span>岁</p>
                    <p>所在城市：<span>上海</span></p>
                </div>
                <div class="head">
                    <img src="./img/head.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        background: ()=>import('./components/background/background')
    },
    data(){
        return {
            homeType: false
        }
    }
}
</script>

<style scoped lang="scss">
.home{
    position: relative;
    text-align: center;
    .home_back{
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: -100;
    }
    .switch{
        position: fixed;
        top: 10px;
        right: 10px;
    }
    .main{
        overflow: hidden;
        transition: all 1s;

        width: 80vw;
        // background-color: #ffffff;
        margin: auto;
        height: 0px;
        min-height: 0px;
        &.active{
            height: auto;
            min-height: 100vh;
        }
        .us{
            // color: #ffffff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 25px;
            padding-top: 20px;
            width: 50%;
            margin: auto;
            // height: 200vh;
            .info{
                font-family: wg-stencil;
                text-align: left;
            }
            .head{
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                img{
                    width: 100%;
                }
            }
        }
    }
    .main_jl{
        
    }
    .main_xq{
        
    }
}
</style>
