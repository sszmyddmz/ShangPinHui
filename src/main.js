import Vue from 'vue'
import App from './App.vue'

//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//引入MockServe.js---mocks数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//引入路由
import router from '@/router'

//引入仓库
import store from '@/store'

import {reqCategoryList} from '@/api'
reqCategoryList()



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
      Vue.prototype.$bus = this //全局事件总线，this指的是vm
  },
  
  //注册路由组件：下面的写法是KV一致省略V（router小写的）
  //注册路由信息：当这里书写router的时候组件身上都拥有$route、$router属性
  router,
  //注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
