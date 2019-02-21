<template>
  <div> 
     <search></search>
     <div class="cate">
        <div class="cate-left">
          <block v-for="(item,index) in cates" :key="index">
             <view>{{item}}</view>
          </block>
        </div>
        <div class="cate-right">right</div>
     </div>
  </div>
</template>
<script>
import Search from '@/components/search'
export default{
  data(){
    return{
      cates:['大家电','小家电','大家电','小家电','大家电','小家电']
    }
  },
  components: {
    Search
  }
}
</script>
<style lang="scss" scope>
.cate{
  position: fixed;
  top: 100rpx;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  &-left{
    width: 200rpx;
    // text-align: center;
    background-color: pink;
  }
  &-right{
    flex:1;
    background-color: #ccc;
  }
}
</style>
