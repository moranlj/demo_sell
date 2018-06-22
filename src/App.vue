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

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  #app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1 );
    position: relative;
  }
  #app .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7,17,27,0.1 );
    content: ' ';
  }
  #app .tab .tab-item{
    flex: 1;
  }
  #app .tab .tab-item > a{
    display: block;
    font-size: 14px;
    /*color:rgb(77,85,93);*/
  }
  .router-link-active {
    color: red;
  }

</style>
