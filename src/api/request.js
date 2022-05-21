//对于axios二次封装
import axios from "axios"
//引入进度条和样式
import nprogress from "nprogress"
import "nprogress/nprogress.css"
//当前模块引入store（获取游客身份等）
import store from '@/store'


// axios是基于promise的一个http库,axios返回的就是一个Promise对象

//用create方法创建一个axios实例
//requests就是axios不过要稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求时路径会出现api
    baseURL:"/api",
    //请求超时时间5s
    timeout:5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //通过上行请求的请求头，把用户临时身份带给服务器
     //请求头添加的属性名字userTempid不能瞎写，因为已经和后台人员商量好了
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //config：配置对象，对象里面有个属性很重要，headers请求头
    //进度条开始
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据后响应拦截器可捕获，可以做一些事情
    nprogress.done();
    return res.data
    },(error)=>{
        return Promise.reject(new Error('faile'))
    }
)

export default requests