//当前这个模块：api进行统一管理
import requests  from "./request";
import mockRequests from './mockAjax'

//三级联动接口
//  /api/product/getBaseCategoryList get方式 无参数

//调这个函数就发送请求,axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList', method:'get'});

//获取banner（home首页轮播图的接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

//获取搜索商品模块的数据 地址/api/list post 请求需要带参数
//这个接口【携带参数：最多十个，十个属性可以传递，也可以不传递，但是至少给给服务器携带一个空对象】
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:"post", data:params})

//获取产品详情的接口
//URL:/api/item/{skuId}  get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车(对已有物品进行数量改动)
//URL:/api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});
