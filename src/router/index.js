//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
//引入store
import store from "../store";
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
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为的设置
    scrollBehavior(to, from, savedPosition) {
        //设置Y轴的起点(y=0顶部)
        //当然滚动行为也可以设置x轴的
        return { y: 0 }
   }
})

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next)=>{
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来的信息
    //next: next() 放行  next(path) 放行到指定路由  next(false)
    //方便测试 统一放行
    next();
    let token  = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户已经登录了
    if(token){
        //已经登录还想去登录页面------不行
        if(to.path=="/login"||to.path=='/register'){
            next('/');
        }else{
            //已经登陆了,访问的是非登录与注册页面
            //登录了且拥有用户信息放行
            if(name){
                next();
            }else{
                //登录了但没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效，清除后重新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        next();
    }

})

export default router