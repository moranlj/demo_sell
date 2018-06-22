<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater">
          <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMapå[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}</span>
        <i></i>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
 // <!--props:接受父组件的数据-->
    export default {
        name: 'headers',
        props: {
            seller: {
              type: Object
            }
        },
      created() {
          this.classMap = ['decrease','discount','special','invoice','guarantee']
      }
    }
</script>

<style scoped>
  .header{
    color: #fff;
    background: #000;
  }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .avater{
    display: inline-block;
  }
  .content{
    display: inline-block;
    font-size: 14px;
    margin-left: 15px;
  }
</style>
