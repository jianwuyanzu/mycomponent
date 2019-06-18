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
        <div class="main main_xq" :class="{active: !homeType}">
            <div>
                <div class='myInfo'>
                    <div class="info">
                        <p>name：<span>jianwuyanzu</span></p>
                        <p>age：<span>24</span></p>
                        <p>city：<span>shanghai</span></p>
                    </div>
                    <img src="./img/head.png">
                </div>
            </div>
        </div>
        <div class="main main_jl" :class="{active: homeType}">
            <el-button type="primary" :disabled="true">下载简历(pdf)</el-button>
            <el-button type="primary" @click="goLayout">轮子厂</el-button>
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
            homeType: true
        }
    },
    methods: {
        goLayout(){
            this.$router.push({
                name: 'layout'
            })
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
        padding-top: 50px;
        box-sizing: border-box;
        width: 80vw;
        // background-color: #ffffff;
        margin: auto;
        min-height: 0px;
        max-height: 0px;
        &.active{
            min-height: 100vh;
            max-height: 100vh;
        }
        &.main_xq{
            .myInfo{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 50%;
                margin: auto;
                transition: all 1s;
                padding: 20px;
                border-radius: 20px;
                &:hover{
                    background: rgba(0, 0, 0, 0.5);
                }
                .info{
                    font-family: wg-stencil;
                    font-size: 25px;
                    text-align: left;
                }
                >img{
                    width: 200px;
                }
            }
        }
        &.main_jl{
            
        }
    }
}
</style>
