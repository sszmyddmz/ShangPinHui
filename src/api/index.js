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
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车(对已有物品进行数量改动)
//URL:/api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口
//URL:/api/cart/cartList   get 
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE  
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
//URL:/api/user/passport/register  method:post    phone code password，三个参数直接放到一个对象里。data写法是kv一致省略v
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息(需要带着用户的token向服务器要用户信息)
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'})

