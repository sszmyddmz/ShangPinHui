<template>
    <div>
        <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommand/>
        <Rank/>
        <Like/>
        <!-- Floor这个组件自己在内部是没有发请求的，数据是父组件Home给的-->
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommand from '@/pages/Home/Recommand'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
    name:'',
    components:{
        ListContainer,
        Recommand,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        //派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList')
        //获取用户信息。用前置路由守卫的话，就不用每次加载完派发了。
        //直接在全局前置路由守卫中判断有没有用户信息，没有就派发，有就放行。
        // this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
}
</script>

<style scoped>

</style>