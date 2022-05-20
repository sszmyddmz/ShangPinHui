//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
//使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push/replace
//第一个参数是告诉push方法往哪里跳转（+传递哪些参数），是一个对象
//第二第三个参数表示成功回调、失败回调
VueRouter.prototype.push = function(location, resolve, reject){
    //传了回调函数
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } 
    //如果调用的时候回调函数至少有一个没传
    else {
        originPush.call(this, location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes,
    //滚动行为的设置
    scrollBehavior(to, from, savedPosition) {
        //设置Y轴的起点(y=0顶部)
        //当然滚动行为也可以设置x轴的
        return { y: 0 }
   }
})