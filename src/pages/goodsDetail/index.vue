<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="swiper" 
        indicator-dots
        autoplay
        circular
        indicator-active-color="#eee">
      <block 
      v-for="(item,index) in proDetailData.pics" 
      :key="index"
      @tap="previewBigImg">
        <swiper-item>
          <image class="slide-image" mode="aspectFill" :src="item.pics_big"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品价格 -->
    <view class="goods-price">￥ {{ proDetailData.goods_price }}</view>
    <view class="goods-info">
        <view class="info-left">
          <!-- 商品信息 -->
           {{ proDetailData.goods_name }}
        </view>
        <view class="info-right">
          <span class="iconfont icon-xingxing1"></span>
          收藏
        </view>
    </view>
    <view class="express">快递: <em>免运费</em></view>
    <view class="detail">
      <view class="detail-title">商品详情</view>
      <view class="detail-content" v-html="proDetailData.goods_introduce"></view>
    </view>
    <view class="footer">
      <button class="contact" open-type="contact">打开客服聊天窗口</button>
      <view class="ft-left">
        <span class="iconfont icon-kefu"></span>
        联系客服
      </view>
      <navigator open-type="switchTab" url="/pages/cart/main" class="ft-left">
        <span class="iconfont icon-caigou-xianxing"></span>
        购物车
      </navigator>
      <view class="ft-right" @tap="addToCart(proDetailData.goods_id)">加入购物车</view>
      <view class="ft-right">立即购买</view>
    </view>
  </div>
</template>
<script>
import request from '@/utils/request'
import {getGoodsDetail} from '@/api'
export default{
data(){
    return{
      proDetailId:0,
      proDetailData:{}
    }
  },
  onLoad(data){
    this.proDetailId=data.goods_id
    // request.get('goods/detail',{goods_id:this.proDetailId})
    getGoodsDetail({goods_id:this.proDetailId}).then(res=>{
      // console.log(res)
     this.proDetailData = res.data.message
     // 因为小程序暂时还不支持 webp 图片格式，我们利用正则把 webp 图片改成 jpg
      this.proDetailData.goods_introduce = this.proDetailData.goods_introduce.replace(/jpg?.+?.webp/g,'jpg');
    })
  },
  methods:{
    previewBigImg(){
      let imgUrl=[]
      this.proDetailData.pics.forEach(v=>{
        imgUrls.push(v.pics_big);
      })
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: imgUrls // 需要预览的图片http链接列表
    })
    },
    // 点击加入购物车，把商品加入购物车列表中
    addToCart(id){
      // 如果数据还没加载到就没有商品id和详情数据，直接返回，不用写加入购物车的逻辑
      if(!id) return
      // 反之 给当前的商品详情添加选中状态和添加商品数量
      this.proDetailData.selected = true
      this.proDetailData.count = 1
      // 把当前商品详情数据添加到本地存储中是有条件的
      // 1.如果本地存储中没有该商品就直接添加到购物车
      // 2.如果本地存储中有该商品就把商品数量加一
        let cartList=wx.getStorage('cartList') || {}
      if(!cartList[id]){
        console.log(1)
         cartList[id]= this.proDetailData
      } else {
        // 存在相加
        console.log(2)
        cartList[id].count += this.proDetailData.count
      }
       // 把修改过的数据重新设置到本地存储
      wx.setStorageSync('cartList',cartList)
      wx.showToast({
        title: '加入成功', //提示的内容,
        icon: 'success', //图标,
        duration: 1000, //延迟时间,
        mask: true, //显示透明蒙层，防止触摸穿透,
       
      })
      
    }
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
    .info-left{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;/*行数n*/
        -webkit-box-orient: vertical;
    }
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
.express{
    display: flex;
    padding-left:20rpx;
    padding-bottom: 20rpx;
    color: #666;
    font-size:32rpx;
    em{
      margin-left: 30rpx;
    }
  }
.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
    // 解决富文本图片的间隙
    .detail-content{
      font-size: 0;
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
