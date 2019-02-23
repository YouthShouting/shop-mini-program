<template>
  <div>
    <block v-for="(item,index) in proDetailData" :key="index">
      <view class="swiper">
      <block v-for="(subItem,subIndex) in item.pics" :key="subIndex">
        <image class="slide-image" :src="subItem.pics_big"></image>
      </block>
      <view class="goods-price">￥2.00</view>
      <view class="goods-info">
        {{item.goods_name}}
        <view class="info-right">收藏</view>
      </view>
      <view>快递：免运费</view>
      <view class="detail">
        <view class="detail-title">促销：<em>满300减30</em></view>
      </view>
    </view>
    </block>
    <view class="footer">
      <view class="contact">
        <view class="ft-left"><span>联系客服</span><span>购物车</span></view>
        <view class="ft-right"><span>加人购物车</span><span>立即购买</span></view>
      </view>
    </view>
  </div>
</template>
<script>
import request from '@/utils/request'
export default{
data(){
    return{
      proDetailId:[],
      proDetailData:[]
    }
  },
  onLoad(data){
    this.proDetailId=data.goods_id
    // console.log(this.detailData)
    request.get('goods/detail',{goods_id:this.proDetailId}).then(res=>{
      // console.log(res)
      let {message} =res.data
      // this.proDetailData=message
      // console.log(this.proDetailData)
    })
  }
}
</script>
<style lang="scss">
.swiper{
    height:720rpx;
}
.slide-image{
    height:720rpx;
    width:750rpx;
}
.goods-price{
    padding:20rpx;
    color:red;
    font-size:22px;
}
.goods-info{
    padding:20rpx;
    padding-top:0;
    display: flex;
    .info-right{
        width:160rpx;
        text-align: center;
        color:#999;
        border-left:1px #999 solid;
        font-size:14px;
        margin-left:20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
    }
}
.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
}
.footer{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    height:100rpx;
    background:#fff;
    display: flex;
    .contact{
        width:20%;
        height:100rpx;
        padding:0;
        margin:0;
        position: absolute;
        left:0;
        top:0;
        opacity: 0;
    }
    .ft-left{
        width:20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#666;
        font-size: 14px;
        span{
            font-size:18px;
        }
    }
    .ft-right{
        width:30%;
        background: orange;
        line-height: 100rpx;
        text-align: center;
        color:#fff;
        &:last-child{
            background: red;
        }
    }
}
</style>
