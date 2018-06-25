<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper" >
        <ul class="menu-wrapper">
          <li v-for="item in goods" class="menu_item" :class="{'current': currentIndex == $index}"
          @click="selectMenu($index,$event)">
            <span class="text">
              <span class="icon" :class="iconClassMap[item.type]">
                {{item.name}}
              </span>
            </span>
          </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food_list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                  <li v-for="food in item.foods" class="food-item">
                      <div class="icon">
                        <img :src="food.icon"/>
                      </div>
                      <div class="content">
                        <h2 class="name">{{food.name}}</h2>
                        <p class="desc">{{food.description}}</p>
                        <div class="extra">
                          <span>月售{{food.sellCount}}</span>
                          <span>好评率{{food.rating}}</span>
                        </div>
                        <div class="price">
                          <span class="newPrice">¥{{food.price}}</span>
                          <span class="oldPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                        </div>
                      </div>
                  </li>
                </ul>
            </li>
        </ul>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  //请求数据返回的状态码
  const  ERR_OK = 0;
  export default {
      name: 'goods',
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          goods: [],
          listHeight: [],
          scrolly: 0
        }
      },
      computed: {
        currentIndex() {
          for (let i=0;i<this.listHeight;i++){
            let height1 = this.listHeight[i]
            let heigth2 = this.listHeight[i+1]
            if(!heigth2 || (this.scrolly >=height1 && this.scrolly < heigth2)){
              return i
            }
          }
          return 0
        }
      },
      created() {
        this.iconClassMap = ['decrease','discount','special','invoice','guarantee']
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            if(response.code == ERR_OK){
              this.goods = response.data
              this.$nextTick(() => {
                this._initScroll(); // 初始化scroll
                this._calculateHeight();
              })
            }
         })
      },
      methods: {
        _initScroll() {
           this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
             click: true
          });
           this.foodsWrapper = new BScroll(this.$refs.foodsWrapper,{
             click: true,
             probeType: 3
           });
           this.foodsScroll.on('scroll',(pos) => {
             this.scrolly = Math.abs(Math.round(pos.y));
           })
        },
        _calculateHeight() {
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let height = 0
          this.listHeight.push(height)
          for (let i = 0;i< foodList.length; i++){
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
          }
        },
        selectMenu(index,event) {
          if(!event._constructed){
            return
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          this.foodsScroll.scrollToElement(el,300)
        },
      }
   }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  /*@import '../../common/stylus/mixin'*/
  .menu_item{
    display table
    height 54px
    width 56px
    line-height 14px
  }
  .menu_item .current{
  position relative
  margin-top -1px
  background #fffff
  font-weight 700}
  .goods
    display flex
    position absolute
    top 200px
    bottom 46px
    width 100%
    overflow hidden
    .menu_wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
    .foods-wrapper
      flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9ddel
      font-size 12px
      color rgb(147,153,159)
      background #f3f5f7
    .food-item
      position relative
      display flex
      margin: 0 18px;
      padding: 18px 0;
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon
        flex 0 0 57px
      &:last-child
        border-bottom none
      .content
        flex 1
        padding-left 10px
        h2
          margin 2px 0 8px 0
          font-size 14px
          line-height 14px
          height 14px
          font-weight 700
          color rgb(7,17,27)
        .sell-info,.description
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          .sellCount
            margin-right 4px
        .description
          font-size 10px
          margin-bottom 8px
          line-height: 12px
        .price
          font-size 10px
          font-weight 700
          line-height 24px
          .newPrice
            font-size 14px
            color rgb(240,20,20)
            .unit
              font-size 10px
              font-weight normal
          .oldPrice
            text-decoration line-through
            color rgb(147,153,159)
            padding-left 4px
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom 12px
          z-index 20
</style>
