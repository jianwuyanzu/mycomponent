<template>
    <el-container class="layout">
        <el-aside>
            <Sidebar ref="sidebar" class="customScrollbar"></Sidebar>
        </el-aside>
        <el-container>
            <el-header>
                <AppHeader @collSide="collSide()"></AppHeader>
            </el-header>
            <el-main class="customScrollbar">
                <transition name="fade-transform" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
import Sidebar from './components/Sidebar'
import AppHeader from './components/Header'

export default {
    components: {
        Sidebar,
        AppHeader
    },
    methods: {
        collSide: function(){
            this.$refs.sidebar.changeSide();
            this.ofl = !this.ofl;
        }
    }
}
</script>

<style lang="scss" scoped>
.layout{
    height: 100%;
    .el-aside{
        width: auto !important;
        height: 100%;
    }
    .el-header{
        padding: 0;
    }
    .el-main{
        background-color: #f5f5f5;
        >div{
            height: auto;
            min-height: calc(100vh - 100px);
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
