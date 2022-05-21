import { reqGoodsInfo } from "@/api"
import {reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from "@/utils/uuid_token"
 
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息
    async getGoodInfo({commit}, skuId){
         //注意:获取搜索页面的数据（请求接口），至少携带一个空对象才能获取数据
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200){
            commit("GETGOODINFO", result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId,skuNum}){
        //加入购物车成功后，前台向服务器发数据，服务器储存了买了什么东西和数量，并不会返回其他数据
        //所以不需要在仓库中储存数据。请求返回code==200表示成功
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //加入购物车成功
        if(result.code==200){
            //代表当前函数返回的promise状态是成功。返回任意数据都可
            return 'ok';
        }else{
            //加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
}

const getters = {
    //路径导航的简化
    categoryView(state){
        //计算属性注意:
        //情况1:goodInfo是一个空对象，空对象打点categoryView等于undefined，等于把undefined给组件
        //情况2:当服务器的数据返回，goodInfo属性的属性值发生变化，重新计算（goodInfo）存储即为服务器的数据，
        //给组件的是服务器的数据
        return state.goodInfo.categoryView||{}
     },
    //产品详情的数据的简化
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //产品售卖属性数据简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]; 
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}