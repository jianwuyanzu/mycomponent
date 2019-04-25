import Axios from 'axios'
import Vue from 'vue'

let axios = Axios.create({
    baseURL: process.env.API_ROOT,
    // baseURL: 'http://yixing.free.idcfengye.com/medical-cloud/Api/',
    timeout: 1000 * 12,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 请求拦截器
axios.interceptors.request.use((config)=>{
    return config;
}, (error)=>{
    return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use((res)=>{
    return Promise.resolve(res);
}, (error)=>{
    return Promise.reject(error);
})