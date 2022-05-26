/*//引入路由组件
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
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'*/

export default [
    {
        path:"/center",
        component:() => import('@/pages/Center'),
        meta:{show:true},
        //二级路由
        children:[
            {
                //不写"/"或者写全path: '/center/myorder',
                path:'myorder',
                component:() => import('@/pages/Center/myOrder'),
            },
            {
                path:'grouporder',
                component:() => import('@/pages/Center/groupOrder')
            },
            //重定向.子路由为空的话，默认跳转到myorder。也可以在center中重定向，redirect写为'/center/myorder'
            {
                path: '',
                redirect: 'myorder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:() => import('@/pages/PaySuccess'),
        meta:{show:true}
    },
    {
        path:"/home",
        component:() => import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta:{show:true},
        // 将query参数映射成props传递给路由组件
        props: route => ({orderId: route.query.orderId}),
        // 只能从交易界面, 才能跳转到支付界面
        beforeEnter (to, from, next) {
          if (from.path == '/trade') {
            next()
          } else {
            next(false)
          }
        }
    },
    {
        path:"/trade",
        component:() => import('@/pages/Trade'),
        meta:{show:true},
        //路由独享守卫
        beforeEnter (to, from, next) {
            //去交易页必须是从购物车页面来，其他的不能跳
            if (from.path == '/shopcart') {
              next()
            } else {
              next(false) //从哪儿来回哪儿去
            }
          }
    },
    {
        path:"/shopcart",
        name:'shopcart',
        component:() => import('@/pages/ShopCart'),
        meta:{show:true},
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:() => import('@/pages/AddCartSuccess'),
        meta:{show:true},
    },
    {
        path:"/search/:keyword?",
        component:() => import('@/pages/Search'),
        meta:{show:true},
        name:"search",
        props:[]
    },
    {
        path:"/Login",
        component:() => import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:"/register",
        component:() => import('@/pages/Register'),
        meta:{show:false},
    },
    {
        path:"/detail/:skuId",
        component:() => import('@/pages/Detail'),
        meta:{show:true}
    },
    //重定向,在项目跑起来的时候访问/，立马让他定向到首页
    {
        path:"*",
        redirect:"/home"
    }
]