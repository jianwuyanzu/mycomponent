<template>
    <div class="home customScrollbar">
        <canvas-time class="canvas_time" bg_color="#effdfd"></canvas-time>
        <background class="home_back"></background>
        <el-switch
            class="switch"
            v-model="homeType"
            inactive-color="#ff4949"
            active-text="简历版"
            inactive-text="交友版（相亲版）">
        </el-switch>
        <div class="main main_xq customScrollbar" :class="{active: !homeType}">
            <div class="jbxx">
                <p>基本信息</p>
                <div class='main_div myInfo'>
                    <img src="./img/head.jpeg" title="更多照片联系本人获取" oncontextmenu="return false;">
                    <div class="jbxx_div">
                        <div class="info">
                            <p>姓名：<span>彭宏晟</span></p>
                            <p>性别：<span>男</span></p>
                            <p>民族：<span>汉</span></p>
                            <p>出生日期：<span>94-11</span></p>
                        </div>
                        <div class="info">
                            <p>生肖：<span>狗</span></p>
                            <p>血型：<span>蚊子知道</span></p>
                            <p>重病史：<span>无</span></p>
                            <p>视力：<span>平时生活不戴眼镜</span></p>
                        </div>
                        <div class="info">
                            <p>身高：<span>173cm</span></p>
                            <p>学历：<span>本科</span></p>
                            <p>星座：<span>天蝎</span></p>
                            <p>户籍：<span>江西-吉安</span></p>
                        </div>
                        <div class="info">
                            <p>专业：<span>软件工程</span></p>
                            <p>毕业年份：<span>16-6</span></p>
                            <p>职业：<span>IT-前端</span></p>
                            <p>所在地：<span>上海</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shzt">
                <p>生活状态</p>
                <div class='main_div myInfo'>
                    <div class="info">
                        <p>住房：<span>租房</span></p>
                        <p>是否吸烟：<span>否</span></p>
                        <p>是否饮酒：<span>否</span></p>
                    </div>
                    <div class="info">
                        <p>购车：<span>无</span></p>
                        <p>较大消费：<span>自我提升，房租，其他</span></p>
                        <p>作息时间：<span>基本规律，偶尔懒散</span></p>
                    </div>
                </div>
            </div>
            <div class="xqah">
                <p>兴趣爱好</p>
                <div class='main_div myInfo'>
                    <div class="info">
                        <p>体育运动：<span>基本都略懂，但只限于略懂</span></p>
                        <p>喜欢的食物：<span>吃货</span></p>
                        <p>喜欢的书籍：<span>科幻人文，经典现代，都有所涉猎</span></p>
                    </div>
                    <div class="info">
                        <p>业余爱好：<span>ps4，steam</span></p>
                        <p>待未成爱好：<span>运动，旅行，switch，xbox</span></p>
                        <p>理想：<span></span></p>
                    </div>
                </div>
            </div>
            <div class="zwpj">
                <p>自我评价</p>
                <div class='main_div myInfo'>
                    <div class="info">
                        <p>本人土生土长的吉安人，独生子。出生在一个温暖的高素质家庭，家庭条件一般，经济水平一般。教育方面，父母既爱又严，培养了我积极独立的性格。外表斯文，是一个性格乐观，开朗的男生。喜欢接触新生事物。待人温和，平易近人，为人处世顾全大局，和熟悉的人话多，是个喜欢安静的人。希望能有一个一起聊天，一起玩耍，一起愉快生活的人生伴侣。</p>
                    </div>
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
            homeType: false
        }
    },
    methods: {
        goLayout(){
            this.$router.push({
                name: 'layout'
            })
        }
    },
    mounted(){
        if(document.body.clientWidth < 450){
            alert('本页面未对移动端做优化，建议pc端浏览')
        }
    }
}
</script>

<style scoped lang="scss">
.home{
    position: relative;
    text-align: center;
    .canvas_time{
        position: fixed;
        top: 40px;
        right: 20px;
        z-index: -99
    }
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
        width: 100vw;
        // background-color: #ffffff;
        min-height: 0px;
        height: 0px;
        .main_div{
            &:hover{
                background: rgba(0, 0, 0, 0.5);
                color: #ffffff;
            }
        }
        &.active{
            padding: 50px 10vw;
            min-height: 100vh;
            // height: auto;
            overflow: auto;
            // max-height: auto;
            // width: 80vw;
        }
        &.main_xq{
            >div{
                >P{
                    text-align: left;
                    font-size: 25px;
                }
                &.jbxx{

                }
            }
            .myInfo{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                // width: 50%;
                min-width: 200px;
                transition: all 1s;
                padding: 20px;
                border-radius: 20px;
                flex-wrap: wrap;
                .jbxx_div{
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                }
                .info{
                    min-width: 20%;
                    font-family: wg-stencil;
                    font-size: 18px;
                    text-align: left;
                    margin-right: 5%;
                    &:last-child{
                        margin: 0px;
                    }
                }
                >img{
                    width: 200px;
                    margin-right: 20px;
                }
            }
        }
        &.main_jl{
            
        }
    }
}
</style>
