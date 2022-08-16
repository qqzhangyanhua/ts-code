<template>
    <view class="content">
      <view class="content-header">header</view>
      <view class="content-center">content</view>
      <view class="content-footer">
        footer
      </view>
    </view>
</template>
<script lang='ts' setup>
</script>
<style lang="scss" scoped>
.content{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .content-center{
    flex:1 0 auto;
  }
  .content-header{
    height: 100rpx;
    flex: 0 0 auto;
    background-color: aqua;
  }
  .content-footer{
    height: 100rpx;
    flex: 0 0 auto;
    background-color:palegoldenrod;
  }
 
}

</style>
