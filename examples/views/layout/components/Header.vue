<template>
<nav class="header">
    <span class="sg" :class="{turn: istrun}" @click="collSide()">&#9776;</span>
    <Breadcrumb :model="breadcrumbData"></Breadcrumb>
    <ul class= 'user'>
        <a>
            <img src=""/>
        </a>
        <el-dropdown placement="bottom-end" @command="userClick">
            <span>
                {{userName}}<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided command="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </ul>
</nav>
</template>

<script scoped>
import Breadcrumb from './Breadcrumb'
var changeBreadcrumb = function(data){
    let allPath = [],pushPath = {};
    data.matched.forEach((val,index,arr) => {
        if(val.meta && val.meta.title){
            allPath.push({
                "text": val.meta.title,
                "name": val.name,
                "path": val.path
            });
        }else{
            // allPath.push({
            //     "text": '首页',
            //     "name": val.name,
            //     "path": '/fullElement'
            // });
        }
    });
    return allPath;
}

export default {
    data() {
      return {
            istrun: false,
            userName: '用户不存在',
            breadcrumbData: []
      };
    },
    components: {
        Breadcrumb
    },
    methods: {
        collSide: function(){
            this.istrun = !this.istrun;
            this.$emit('collSide');
        },
        // 用户信息点击
        userClick: function(command){
            this.$router.push({
                name: 'Login'
            })
        }
    },
    watch: {
        $route() {
            this.breadcrumbData = [];
            setTimeout(()=>{
                this.breadcrumbData = changeBreadcrumb(this.$route);
            })
        }
    },
    mounted() {
        this.breadcrumbData = changeBreadcrumb(this.$route);
    }
}
</script>

<style lang="scss" scoped>
.header{
    height: 100%;
    border-bottom: 1px solid #cfd8dc;
    display: flex;
    align-items: center;
    .sg{
        font-size: 20px;
        margin: 0 20px;
        cursor: pointer;
        transition: all 1s;
        &.turn{
            transform: rotate(90deg)
        }
    }
    .user{
        margin-left: auto;
        margin-right: 5%;
    }
}
</style>
