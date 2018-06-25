<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--父组件传值给子组件-->
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import headers from './components/header/headers.vue'
//请求数据返回的状态码
const  ERR_OK = 0;
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
      this.$http.get('/api/seller').then((response) => {
          response = response.body
          if(response.code == ERR_OK){
            this.seller = response.data
          }
      })
  },
  components:{
    'v-header':headers
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/index'
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      a
        display:block
        font-size:14px
        color rgb(77,85,93)
        &.active
          font-size 14px
          color rgb(240,20,20)
</style>
