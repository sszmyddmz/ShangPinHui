//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'

export default [
    {
        path:"/home",
        component:Home,
        meta:{show:true}
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