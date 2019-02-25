<template>
  <div>
    <!-- 头部选择地址 -->
    <view class="cart-top" @tap="chooseAddress">
      <block v-if="address.userName">
        <view class="user">
        <view>收货人：{{address.userName}}</view>
        <view> {{address.mobile}} </view>
      </view>
      <view class="address">
        收货地址：{{address.addr}}
      </view>
      </block>
      <block v-else>
        <view class="add-address">新增收货地址 <span class="iconfont icon-icon-test"></span></view>
      </block>
    </view>
    <!-- 购物车列表 -->
    <view class="list-title"><span class="iconfont icon-dianpu"></span>优购生活馆</view>
    <view class="ware-list">
      <block>
        <view class="ware-item">
          <!-- 选择按钮 -->
          <view class="choice-button">
            <view class="iconfont icon-fuxuankuang_weixuanzhong"></view>
          </view>
          <!-- 内容主体 -->
          <view class="ware-content">
            <view class="ware-image">
              <img src="https://img1.360buyimg.com/da/jfs/t1/17942/28/7802/71990/5c6fdba4Eb7c18f89/1bbdff6f3feb08a3.jpg" alt=""/>
            </view>
            <view class="ware-info">
              <view>商品名称</view>
              <view class="ware-info-btm">
                <view class="ware-price">￥20.00</view>
                <view class="calculate">
                  <div class="rect">-</div>
                  <div class="number">0</div>
                  <div class="rect">-</div>
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 底部结算 -->
    <div class="cart-total">
      <div class="total-button">
        <view class="iconfont icon-fuxuankuang_xuanzhong"></view>
        全选
      </div>
      <div class="total-center">
        <div class="colorRed">￥20.00</div>
        <div class="price-tips">
          包邮
        </div>
      </div>
      <div class="accounts">
        结算
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      address:{
        userName:"",
        mobile:"",
        addr:""
      }
    }
  },
  methods:{
    chooseAddress(){
       wx.chooseAddress({
        success:(res)=> {
          this.address = {
            userName:res.userName,
            mobile:res.telNumber,
            addr:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
          wx.setStorageSync('address',this.address);
        }
      })
    }
  }
}
</script>
<style lang="scss">
.cart-top {
  min-height: 180rpx;
  position: relative;
  .user {
    display: flex;
    padding: 20rpx;
    justify-content: space-between;
    position: relative;
    padding-right: 50rpx;

    &:after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-top: 1px #999 solid;
      border-right: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      margin-top: 6px;
    }
  }

  .address {
    padding: 20rpx;
    padding-top: 0;
  }

  .address-border {
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
  }

  .add-address {
    height: 180rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-title {
  padding: 20rpx;
  border-bottom: 1px #eee solid;
  border-top: 10px #eee solid;
}

.ware-list {
  padding-bottom: 100rpx;
}

.icon-fuxuankuang_xuanzhong {
  color: #ff2d4a;
}

.ware-item {
  padding: 20rpx;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  .choice-button {
    flex-shrink: 0;
    text-align: center;
    margin-right: 20rpx;
    font-size: 32rpx;
    .icon-dianpu{
      font-size: 40rpx;
      padding-right: 20rpx;
      color:orange;
    }
  }
   
}

.ware-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.ware-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  border-bottom: 1px #eee solid;
  padding-bottom: 20rpx;
}

.ware-image {
  img {
    display: block;
    width: 200rpx;
    height: 200rpx;
  }
}

.ware-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ware-info-btm {
  display: flex;
  justify-content: space-between;

  .ware-price {
    color: red;
  }
}

.calculate {
  display: flex;
}

.rect {
  width: 20px;
  text-align: center;
  border: 1px #999 solid;
  line-height: 1.2;
}

.number {
  margin: 0 10px;
}

.cart-total {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  .total-button {
    padding-left: 20px;
    icon {
      margin-right: 10px;
    }
  }

  .total-center {
    flex: 1;
    padding: 20rpx;

    .colorRed {
      color: red;
    }

    .price-tips {
      font-size: 14px;
      color: #666;
    }
  }

  .accounts {
    width: 30%;
    height: 100rpx;
    background: red;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
  }
}
</style>
