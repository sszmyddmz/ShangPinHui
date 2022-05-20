import {reqCategoryList, reqGetBannerList,reqFloorList} from '@/api' //axios封装后请求
//home模块的小仓库
const state = {
    //home仓库中存储三级菜单的数据
    //空数据的类型要看服务器返回什么数据
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList =  categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorlist){
        state.floorList = floorlist
    }
}
const actions = {
    //参数中解构出commit???{commit}是解构赋值，对应context.commit
    async categoryList({commit}){
        let result = await reqCategoryList()
        if (result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if (result.code==200){
            commit("GETBANNERLIST",result.data)
        }
    },
    //获取floor轮播图的数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if (result.code==200){
            commit("GETFLOORLIST",result.data)
        }
    },
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}

/*
//需要使用插件一次
Vue.use(Vuex)
//仓库存储数据的地方
const state = {}
//mutations修改state的唯一手段
const mutations = {}
//处理action，可以书写自己的业务逻辑，也可以异步处理,但是不能修改state
const actions = {}
//getters，理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}
*/ 