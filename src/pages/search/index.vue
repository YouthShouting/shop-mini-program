<template>
  <div>
    <view class="search-wrapper">
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
        <view class="cancel" 
        v-show="inputValue"
        @tap ="inputValue=''">取消</view>
      </view>
      <view class="search-tips" v-show="inputValue">
        <block v-for="(item,index) in searchTips" :key="index">
          <view class="search-item">{{item}}</view>
        </block>
        <view class="history-title"></view>
      </view>
    </view>
  </div>
</template>
<script>
  export default{
      data(){
        return{
          inputValue:"",
          searchTips:[],
          history:[]
        }
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
          this.history=[...new Set(this.inputValue)]
          // 设置本地存储
          wx.setStorageSync('history',this.history)
          // 跳转到商品列表页
          wx.navigateTo({
            url:'/pages/goodsList/main?keyword='+this.inputValue
          })
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
