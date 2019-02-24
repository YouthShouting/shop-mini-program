<template>
  <div>
    <search></search>
    <!-- <div class="search"><div class="input"><icon size="32rpx" type="search" class="search-icon"></icon>搜索</div> </div> -->
    <!-- <div class="silder"><img src="" alt=""></div>
    <div class="smallnav"><a href="javascript:;">one</a><a href="javascript:;">two</a><a href="javascript:;">three</a><a href="javascript:;">four</a></div> -->
    <swiper
        indicator-dots
        autoplay
        circular
        indicator-active-color="#eee"
        class="slide-container"
        >
        <block v-for="(item,index) in imgUrl" :key="index">
          <swiper-item>
            <image :src="item.image_src" class="slide-image" model="widthFix"/>
          </swiper-item>
        </block>
      </swiper>
      <div class="menu">
        <div class="menu-item" v-for="(item,index) in menus" :key="index"><img :src="item.image_src" class="item-image"/></div>
      </div>
      <div class="floor">
          <div class="floor-item" v-for="(item,index) in floors" :key="index">
              <div class="fl-header">
                <image :src="item.floor_title.image_src" node="aspectFit"></image>
              </div>
              <div class="fl-body">
                  <div class="fl-body-lt">
                    <image :src="item.product_list[0].image_src"></image>
                  </div>
                  <div class="fl-body-rt">
                    <image 
                    v-for="(subItem,subIndex) in item.product_list"
                    v-show="subIndex != 0" 
                    :key="subIndex" :src="subItem.image_src"
                    ></image>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import request from '@/utils/request.js'
import { getIndexSwiper,getIndexMenu,getIndexFloor } from "@/api"
import Search from '@/components/search'
export default{
data(){
  return{
    imgUrl:[],
    menus:[],
    floors:[]
   }
 },
 components: {
   Search
 },
 mounted(){
  //  let that=this
  //  wx.request({
  //  url: 'https://itjustfun.cn/api/public/v1/home/swiperdata', // 仅为示例，并非真实的接口地址
  //  success(res) {
  //     that.imgUrl=res.data.data
  //   }
  // })
  // wx.request({
  //   url:'https://itjustfun.cn/api/public/v1/home/catitems',
  //   success: res=>{
  //     this.menus=res.data.data
  //     }
  // })
/*   request('https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata').then(res=>{
    this.imgUrl=res.data.message
  })
  request('https://www.zhengzhicheng.cn/api/public/v1/home/catitems').then(res=>{
    this.menus=res.data.message
  })
  request('https://www.zhengzhicheng.cn/api/public/v1/home/floordata').then(res=>{
    this.floors=res.data.message
  }) */
  this.loadData()
 },
 methods:{
   loadData(){
     getIndexSwiper().then(res=>{
       this.imgUrl = res.data.data
     })
     getIndexMenu().then(res=>{
       this.menus = res.data.data
     })
     getIndexFloor().then(res=>{
       this.floors = res.data.data
     })

   }
 }
}
</script>
<style lang="scss" scope>
  .slide-container{
    height: 320rpx;

  }
  .slide-image{
    width: 100%;
    height: 100%;
  }
  .menu{
    padding: 24rpx;
    display: flex;
    justify-content: space-between;
    }
 .item-image{
    width:128rpx;
    height: 140rpx;
  }

.floor{
  .fl-header{
    image{
      height: 88rpx;
      width: 100%;
    }
  }
  .fl-body{
    display: flex;
    margin: 20rpx 0 20rpx 16rpx;
    .fl-body-lt{
      margin-right: 10rpx;
      image{
        height: 520rpx;
        width: 250rpx;
      }
    }
    .fl-body-rt{
      display: flex;
      flex-wrap: wrap;
      image{
        margin-right:10rpx; 
        height: 256rpx;
        width: 220rpx;
      }
    }
  }
}
  /* .silder{
    height: 320rpx;
    background-color: #ea2;
  }
  .smallnav{
    padding: 24rpx 0;
    display: flex;
    justify-content: space-around;
    background-color: #ccc;
    }
 .smallnav a{
    flex:1;
    width: 128px;
    height: 128px;
    text-align: center;
    background-color: #fff;
    } */
</style>
