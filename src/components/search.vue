<template>
   <div class="search" bindtap="jumpToSearch">
      <div class="input">
          <icon size="32rpx" type="search" class="search-icon"></icon> 搜索
      </div>
    </div>
 </template>

<script>
export default {
  methods: {
    jumpToSearch(){
      console.log(1)
      wx.navigateTo({
        url:'pages/search/main'
      })
    }
  }
 
}
</script>
<style lang="scss" scope>
.search{
    background-color: #eb4450;
    padding: 20rpx 16rpx;
  }
.search .input{
    font-size: 24rpx;
    background-color: #fff;
    border-radius: 6rpx;
    color: #bbb;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-icon{
    margin-right: 5px;
  }
</style>
