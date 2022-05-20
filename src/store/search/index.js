import { reqGetSearchInfo } from "@/api"

//search模块的小仓库
const state = {
    //仓库的初始状态
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({commit}, params){
         //注意:获取搜索页面的数据（请求接口），至少携带一个空对象才能获取数据
        let result = await reqGetSearchInfo(params)
        if (result.code == 200){
            commit("GETSEARCHLIST", result.data)
        }
    }
}
//计算属性，为了简化仓库中的数据而生
const getters = {
    //当前形参state是这个search仓库的state，并非大仓库的
    //若是没网络的话或网慢，至少返回一个空数组，不然的话会返回undefined
    //undefined不能遍历
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    //品牌数据
    tradeMarkList(state){
        return state.searchList.trademarkList||[]
    },
    //平台属性
    attrsList(){
        return state.searchList.attrsList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}