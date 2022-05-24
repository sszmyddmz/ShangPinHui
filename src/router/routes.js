//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'

export default [
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path: '/pay',
        component: Pay,
        meta:{show:true},
        // 将query参数映射成props传递给路由组件
        props: route => ({orderId: route.query.orderId}),
        // 只能从交易界面, 才能跳转到支付界面
        beforeEnter (to, from, next) {
          if (from.path==='/trade') {
            next()
          } else {
            next('/trade')
          }
        }
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true}
    },
    {
        path:"/shopcart",
        name:'shopcart',
        component:ShopCart,
        meta:{show:true},
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true},
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search",
        props:[]
    },
    {
        path:"/Login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false},
    },
    {
        path:"/detail/:skuId",
        component:Detail,
        meta:{show:true}
    },
    //重定向,在项目跑起来的时候访问/，立马让他定向到首页
    {
        path:"*",
        redirect:"/home"
    }
]