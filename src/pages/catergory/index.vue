<template>
  <div> 
     <search></search>
     <div class="cate">
        <scroll-view scroll-y class="cate-left">
          <block v-for="(item,index) in cates" :key="index">
             <view class="cate-left-item" 
             :class="{ active : index == tabIndex }"
             @tap="changeTabIndex(index)"
             >{{item.cat_name}}</view>
          </block>
        </scroll-view>
        <scroll-view scroll-y class="cate-right">
          <block v-for="(item,index) in cateList.children" :key="index">
          <view class="floor">
            <view class="floor-head">
              {{item.cat_name}}
            </view>
            <view class="floor-body">
              <block v-for="(subItem,subIndex) in item.children" :key="subIndex">
              <view class="floor-body-item" @tap="toGoodList(subItem.cat_name)">
                <!-- <image :src="subItem.cat_icon"></image> -->
                <image :src="'https://autumnfish.cn.wx'+subItem.cat_icon"></image>
                <view>{{subItem.cat_name}}</view>
              </view>
              </block>
            </view>
          </view>
          </block>
        </scroll-view>
     </div>
  </div>
</template>
<script>
import Search from '@/components/search'
import request from '@/utils/request'
import { setTimeout } from 'timers';
import { getCategories } from '@/api';
export default{
  data(){
    return{
      cates:[],
      cateList:[],
      tabIndex:0
    }
  },
  components: {
    Search
  },
  methods: {
    changeTabIndex(index){
      this.tabIndex=index
      this.cateList=[]
      setTimeout(()=>{
          this.cateList=this.cates[index]
        },0)
      },
      toGoodList(queryName){
        wx.navigateTo({
          url:'/pages/goodsList/main?'+'keyword='+queryName
        })
      }
  },
  mounted(){
      // request('https://www.zhengzhicheng.cn/api/public/v1/categories')
      getCategories().then(res=>{
        let {message}=res.data
        this.cates=message
        this.cateList=message[0]
    })
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
    overflow: scroll;
    width: 200rpx;
    height: 100%;
    background-color: #f4f4f4;
    &-item{
      line-height: 100rpx;
      font-size: 30rpx;
      text-align: center;
      &.active{
        position: relative;
        color: red;
        background-color: #fff;
        &::after{
          content: "";
          position: absolute;
          background-color: red;
          top: 15rpx;
          left: 0;
          bottom: 15rpx;
          width: 8rpx;
        }
      }
    }
  }
  &-right{
    height: 100%;
    flex:1;
    .floor{
      &-head{
        text-align: center;
        font-size: 35rpx;
        padding: 26rpx 0;
        &::before,&::after{
          content: "/";
           color:#ccc;
        }
      }
      &-body{
          display: flex;
          flex-wrap: wrap;
        &-item{
          width: 33.33%;
          text-align: center;
          image{
            width: 120rpx;
            height: 90rpx;
          }
          view{
            font-size: 28rpx;
            padding: 5rpx 0;
          }
        }
      }
    }
  }
}
</style>
