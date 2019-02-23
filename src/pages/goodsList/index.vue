<template>
  <div>
    <!-- 搜索框 -->
    <view class="search-wrapper">
      <view class="search-input"><icon type="search" size="16"></icon>{{keyword}}</view>
    </view>
    <!-- tab栏 -->
    <view class="tab">
      <block
       v-for="(item,index) in tabs" :key="index">
       <view class="tab-item" 
      :class="{ active : index == tabIndex}"
      @tap="changeTabIndex(index)">{{item}}</view></block>
   </view>
   <!-- 产品列表 -->
   <view class="goods-list">
     <block v-for="(item,index) in goodsList" :key="index">
        <view class="goods-item" @tap="gotoDetail(item.goods_id)">
          <image :src="item.goods_small_logo"></image>
          <view class="goods-right">
            <view class="goods-title">{{item.goods_name}}</view>
            <view class="price">￥{{item.goods_price}}</view>
          </view>
        </view>
     </block>
   </view>
    <view class="loading" v-show="hasMore == false">我也是有底线。。。</view>
  </div>
</template>
<script>
import request from '@/utils/request'
export default{
  data(){
   return{
      keyword:"",
      tabs:['综合','销量','价格'],
      tabIndex:0,
      goodsList:[],
      pagenum:1,
      pagesize:20,
      hasMore:true
    }
  },
  onLoad(queryname){
    this.keyword = queryname.keyword
    this.loadData()
  },
  onShow(){
   this.initData()
   },
  // 监听用户上拉触底事件
   onReachBottom(){
    //  上拉发请求
     this.loadData()
   },
  //  监听用户下拉刷新事件
   onPullDownRefresh(){
     this.initData()
   },
   methods: {
    changeTabIndex(index){
      this.tabIndex = index
    },
    loadData(){
        // 如果没有更多数据就不发请求
        if(!this.hasMore){
          return
        }
         wx.showLoading({
          title: '加载中',
        })
        request('https://www.zhengzhicheng.cn/api/public/v1/goods/search','GET',{
        query: this.keyword,
        pagenum:this.pagenum,
        pagesize:this.pagesize
      }).then(res=>{
        // this.goodsList=res.data.message.goods
        let { goods } = res.data.message
        // console.log(goods)
        // 数据拼接
        this.goodsList = [...this.goodsList , ...goods]
        // 页码数加1
        this.pagenum+=1
        // 隐藏加载中的文字
        wx.hideLoading()
         wx.stopPullDownRefresh()
        if(goods.length < this.pagesize){
          this.hasMore = false
        }
      })
    },
    initData(){
     this.goodsList=[]
     this.pagenum=1
     this.hasMore=true
     this.loadData()
    },
    gotoDetail(tapId){
      wx.navigateTo({
        url:'/pages/goodsDetail/main?'+ 'goods_id='+tapId
      })
    }
  }
}
</script>
<style lang="scss">
.search-wrapper{
    background: #eee;
    padding:20rpx;
    .search-input{
        background:#fff;
        height:60rpx;
        font-size:15px;
        color:#999;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
    }
    .search-input icon{
    margin-right:5px;
    }
}
.tab{
    display: flex;
    border-bottom:1px #eee solid;
    .tab-item{
        flex:1;
        text-align: center;
        line-height: 100rpx;
    }
    .active{
        color:red;
    }
}
.goods-list{
    padding-left:20rpx;
    .goods-item{
        padding:20rpx 20rpx 20rpx 0;
        display: flex;
        border-bottom:1px #eee solid;
        image{
            display: block;
            width:200rpx;
            height:200rpx;
            flex-shrink: 0;
            margin-right: 20rpx;
        }
         .goods-right{
            flex:1;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
        }
         .goods-title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .price{
            color:red;
            font-size: 14px;
            span{
                font-size: 22px;
            }
        }
    }
}
.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>
