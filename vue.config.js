const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //打包时不要map文件
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn'
      }
    },
    host:'localhost', //不设置的话默认跳转http://0.0.0.0:8080
  }
})
