<template>
    <el-menu router :default-active="navSet.defaultActive" :collapse="navSet.isCollapse" :background-color="navSet.backgroundColor" :text-color="navSet.textColor" :active-text-color="navSet.activeTextColor" class="sidebar">

        <div v-for="(x, index_x) in sideBar" :key="index_x" :class="menuDIV">
            <!-- 有children -->
            <el-submenu :index="x.name" v-if="x.children[0]">
                <template slot="title">
                    <i class="fa" :class="iconClass(x.icon)"></i>
                    <span slot="title">{{x.title}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="y.name" :route="{name: y.name}"  v-for="(y, index_y) in x.children" :key="index_y">
                        <span>{{y.title}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 无children -->
            <el-menu-item v-else :index="x.name" :route="{name: x.name}">
                <i class="fa" :class="iconClass(x.icon)"></i>
                <span>{{x.title}}</span>
            </el-menu-item>
        </div>

    </el-menu>
</template>

<script>
import sideBar from '@/common/js/sideBarConfig'

export default {
    data() {
        return {
            navSet: {
                defaultActive: this.$route.name,
                isCollapse: false,
                backgroundColor: '#545c64',
                textColor: '#fff',
                activeTextColor: '#ffd04b'
            },
            sideBar: sideBar
        }
    },
    computed: {
        menuDIV() {
            return{
                'el-menu--collapse': this.navSet.isCollapse
            }
        },
    },
    methods: {
        changeSide() {
            this.navSet.isCollapse = !this.navSet.isCollapse;
        },
        iconClass(icon) {
            let a = {};
            a[icon] = true;
            return a;
        },
        // 获取菜单
        getSideBar(){

        }
    },
    mounted() {
        if(document.body.clientWidth < 450){
            this.navSet.isCollapse = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar{
    &:not(.el-menu--collapse) {
        width: 200px;
    }
    height: 100%;
    text-align: left;
    .fa{
        color: #ffffff;
        font-size: 16px;
        margin-right: 5px;
    }
    li.el-menu-item-group ul li{
        text-align: center;
    }
}
</style>
