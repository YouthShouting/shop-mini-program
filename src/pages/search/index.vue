<template>
  <div>
    <!-- 搜索框分区 -->
    <view class="search-wrapper">
        <!-- 搜索框部分 -->
        <view class="search-content">
          <view class="search-input">
            <icon type="search" size="16"></icon>
            <input type="text"
            placeholder="请输入商品名称"
            focus
            @input="getInputValue"
            v-model="inputValue"
            @confirm="handleQuery">
          </view>
          <button v-show="inputValue" class="cancel" @tap="clearInputValue" size="mini">取消</button>
        </view>
        <!-- 搜索提示部分 -->
        <scroll-view class="search-tips" v-show="inputValue">
          <block v-for="(item,index) in searchTips" :key="index">
            <view class="search-item" @tap="goToDetail(item.goods_id)">{{item.goods_name}}</view>
          </block>
      </scroll-view>
     </view>
      <!-- 搜索框 -->
      <view class="history-wrapper" v-show="history.length > 0">
      <view class="history-title">
        历史搜索
        <icon @tap="clearHistory" type="clear" size="14"></icon>
      </view>
        <view class="history-list">
           <block v-for="(item,index) in history" :key="index">
              <view class="history-item" @tap="ToGoodsList(item)">
                {{ item }}
              </view>
          </block>
        </view>
      </view>
    </div>
</template>
<script>
import { getGoodsQsearch } from "@/api"
  export default{
      data(){
        return{
          inputValue:"",
          searchTips:[],
          history:[]
        }
      },
      // 获取本地历史存储
      onLoad(){
        this.history = wx.getStorageSync('history') || []
      },
      methods: {
        getInputValue(event){
          // 获取searchTips提示数据
           getGoodsQsearch({
            query: this.inputValue
          }).then(res=>{
            this.searchTips = res.data.message
          })
        },
        // 手机端，按下完成按钮触发
        // 模拟器中按下回车键触发
        handleQuery(){
          // 把输入框的数据先存起来
          this.history.unshift(this.inputValue)
          // 去除重复的历史记录
          this.history=[...new Set(this.history)]
          // 设置本地存储
          wx.setStorageSync('history',this.history)
          // 跳转到商品列表页
          this.inputValue=""
          wx.navigateTo({
            url:'/pages/goodsList/main?keyword='+this.inputValue
          })
        },
        // 清除搜索框的内容
        clearInputValue(){
          this.inputValue=""
        },
        // 跳转到详情页面
        goToDetail(id){
          this.inputValue=""
          wx.navigateTo({
            url:'/pages/goodsDetail/main?goods_id='+id
          })
        },
        // 跳转到商品列表页
        ToGoodsList(query){
          this.inputValue=""
          wx.navigateTo({
            url:'/pages/goodsList/main?keyword='+query
          })
        },
        clearHistory(){
          this.history = []
           wx.removeStorageSync('history')
        }
      }
  }
</script>
<style lang="scss">
// 搜索框分区
.search-wrapper {
  background: #eee;
  padding: 20rpx;
  display: flex;
  // 搜索框主体内容
  .search-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // 输入框部分
    .search-input {
      background: #fff;
      display: flex;
      align-items: center;
      height: 60rpx;
      flex: 1;
      icon {
        margin: 0 10px;
      }
      input {
        flex: 1;
        font-size: 14px;
        padding-right: 20rpx;
      }
    }
    // 取消按钮
    .cancel {
      width: 160rpx;
      height: 60rpx;
      padding: 0;
      line-height: 58rpx;
      margin-left: 20rpx;
      background-color: #fff;
      text-align: center;
      font-size:34rpx;
    }
  }
  // 搜索建议提示
  .search-tips {
    position: fixed;
    left: 0;
    right: 0;
    top: 100rpx;
    bottom:0;
    background-color: #f5f5f5;
    padding: 20rpx;
    box-sizing: border-box;
    // 提示项
    .search-item {
      height: 60rpx;
      line-height: 60rpx;
      border-bottom: 1px #eee solid;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.history-title {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list {
  padding: 10rpx;
  .list-item {
    display: inline-block;
    padding: 0 20rpx;
    line-height: 2;
    background: #eee;
    margin: 10rpx;
  }
}
.history {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}
.history-list {
  display: flex;
  padding: 20rpx 10rpx;
  flex-wrap: wrap;
  .history-item {
    margin: 10rpx 10rpx;
    padding: 20rpx;
    background: #eee;
  }
}
</style>
