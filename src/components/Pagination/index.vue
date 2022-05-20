<template>
  <div class="pagination">
    
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button :class="{active:pageNo==1}" v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button :class="{active:pageNo==page}" v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)">{{page}}</button>
    
    <button v-if="startNumAndEndNum.end < totalPage-1">···</button>
    <button :class="{active:pageNo==totalPage}" v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:["total", "pageSize", "pageNo", "continues"],
    computed:{
        //通过父组件传递数据total/pageSize计算出一共多少页.ceil向上取整
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        //计算连续页码的起始和结束页数字
        startNumAndEndNum(){
            //解构需要的参数
            const {continues,pageNo,totalPage} = this
            let start=0, end = 0
            //总页数没有连续页码多
            if(continues > totalPage){
                start = 1
                end = totalPage
            }else{
                start = pageNo - parseInt(continues / 2); //取整
                end = pageNo + parseInt(continues / 2);
                //start出现0或者负数是不对的
                if(start < 1){
                    start = 1
                    end = continues
                }
                //end大于总页数也不对
                if(end > totalPage){
                    end = totalPage
                    start = totalPage - continues +1
                }
            }
            //当前这个计算属性。需要把开始与结束数字返回，只能返回一个对象.KV一致省略V
            return { start, end };
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>