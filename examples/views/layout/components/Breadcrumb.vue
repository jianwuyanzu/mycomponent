<template>
    <div class='breadcrumb'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumbItem">
                <el-breadcrumb-item v-for="(data,index) in model" :key="index+1" :to="{ path: data.path }">
                    <span>{{data.text}}</span>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
import Vue from 'vue'
import router from '@/router/router'

export default {
    props: {
        model: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
.breadcrumb{
    display: flex;
    align-items: center;
}
</style>
