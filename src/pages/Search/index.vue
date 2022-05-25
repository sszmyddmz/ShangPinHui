<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademarkInfo="getTrademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
                <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                    <!-- indexOf()没有找到匹配的返回-1.所以等于-1表示没找到，不等于-1表示找到了。这里代表综合的值是1 -->
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-down':isDesc,'icon-upward':isAsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-down':isDesc,'icon-upward':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                      <!-- 属性值带变量 所以动态的前面加了冒号 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :total="total" :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters, mapState} from 'vuex'
  export default {
    name: 'Search',
    data() {
        return {
            //search传给服务器的参数
            searchParams:{
              category1Id: "", //一级分类的id
              category2Id: "", //二级分类的id
              category3Id: "", //三级分类的id
              categoryName: "", //产品的名字
              keyword: "", //关键字
              props: [], //平台属性的选择参数
              trademark: "", //品牌参数
              //上面这七个参数：有用户选择决定的，因此初始值为空的
              //下面这三个：都有初始值
              order: "1:desc", //携带给服务器参数order--->初始值"1:desc"[综合降序]
              pageNo:1,
              // pageNo:parseInt(localStorage.getItem('pageNo'))||1, //获取第几页的数据，默认即为第一个的数据
              pageSize:3, //每一页需要展示多少条数据
            }
        }
    },
    //当组件挂载完毕之前执行一次，先于mounted
    beforeMount() {
        //this.searchParams.category1Id = this.$route.query.category1Id
        //...
        //Object.assign，合并对象
        Object.assign(this.searchParams, this.$route.query, this.$route.params)

    },
    components: {
      SearchSelector
    },
    mounted() {
        this.getData()
    },
    computed:{
        //这里没有开启命名空间。...mapGetters('search',['goodsList','trademarkList','attrsList'])
        ...mapGetters(['goodsList']),
        isOne(){
            return this.searchParams.order.indexOf('1') != -1
        },
        isTwo(){
            return this.searchParams.order.indexOf('2') != -1
        },
        isAsc(){
             return this.searchParams.order.indexOf('asc') != -1
        },
        isDesc(){
             return this.searchParams.order.indexOf('desc') != -1
        },
        //search模块一共展示多少产品
        ...mapState({total:state=>state.search.searchList.total})
    },
    methods: {
        //向服务器发请求获取search模块数据(根据参数不同获取不同的数据进行展示)
        //把这次请求封装成一个函数
        getData(){
            this.$store.dispatch('getSearchList',this.searchParams)
        },
        //删除分类的名字
        removeCategoryName(){
            this.searchParams.categoryName = undefined
            //置空后还需要再发请求.发请求前分类的名字也要置空
            //属性为空会传给服务器，可以直接undefined，不会把数据传给服务器，性能优化
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            this.getData()
            //地址栏也需要改，路由跳转,自己跳转到search自己这里
            //本意是删除query，如果路径中出现params不应该删除，路由跳转的时候需要带着
            if(this.$route.params){
                this.$router.push({name:'search',params:this.$route.params})
                //getData不用写了，watch监听器发现路由发生变化，就会getData
            }
        },
        //删除关键字
        removeKeyword(){
            this.searchParams.keyword = undefined
            //再次发请求
            this.getData()
            //通知Header组件清除关键字
            this.$bus.$emit('clear')
            //进行路由跳转
            if(this.$route.query){
                this.$router.push({name:"search",query:this.$route.query})
            }
        },
        //子组件SearchSelector中选择了品牌，通过组件自定义事件传给Search父组件trademark参数
        getTrademarkInfo(trademark){
            //整理参数:参数格式切记参考文档 (trademarkList是个对象，里面有两个参数tmId、tmName)
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
            this.getData()
        },
        //删除品牌的信息
        removeTrademark(){
            //将品牌的信息置空
            this.searchParams.trademark = undefined
            this.getData()
        },
        //收集平台属性的回调函数(自定义事件)
        attrInfo(attr,attrValue){
            // ["属性ID:属性值:属性名"]
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
            //push（向数组的尾部添加元素）的时候要考虑不可以重复选attrValue（数组去重）
            if(this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
            //再次发请求
            this.getData()
        },
        removeAttr(index){
            //再次整理参数,splice从第index删除1个
            this.searchParams.props.splice(index,1)
            this.getData()
        },
        //综合与价格的切换和排序
        changeOrder(flag){
            //先储存之前的状态
            let originFlag = this.searchParams.order.split(":")[0]
            let originSort = this.searchParams.order.split(":")[1]
            //如果是同一个标签（比如还是在点综合），那么切换order排序
            let newOrder = ''
            if(flag == originFlag){
                newOrder = `${originFlag}:${originSort == 'desc'?'asc':'desc'}`
            } else{ //点的不是同一个标签，切换标签，默认新的标签是desc排序
                newOrder = `${flag}:desc`
            }
            //重新发请求
            this.searchParams.order = newOrder
            this.getData()          
        },
        //自定义事件的回调函数：获取当前第几页
        getPageNo(pageNo){
            //整理参数
            this.searchParams.pageNo = pageNo
            this.getData()
        }
    },
    watch:{
        //计算属性和监听属性没有this
        //监听路由信息是否发生变化，如果发生变化再次发起请求
        $route(newValue,oldValue){
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            //再次发请求
            this.getData()
            //每一次请求完毕应该清除发请求的1、2、3级分类，使其下一次接收新的响应的id
            //分类名称和关键字不用清理，因为每一次路由变化的时候会重新赋值
            this.searchParams.category1Id = ''
            this.searchParams.category2Id = ''
            this.searchParams.category3Id = ''
        }
    }

  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>