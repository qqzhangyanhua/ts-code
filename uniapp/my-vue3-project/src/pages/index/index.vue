<template>
  <view class="content">
    <view class="content-header">header</view>
    <view class="content-center">
      <view class="content-center-condition">
        <view class="content-center-condition-type">
          <text>类型:</text>
          <view class="content-center-condition-type-btn">
            <view>爱情</view>
            <view>喜剧</view>
            <view>动画</view>
          </view>
        </view>
        <view class="content-center-condition-type">
          <text>区域:</text>
          <view class="content-center-condition-type-btn">
            <view :class="{active:}" v-for='item in areaList' :key="item.country_id" @click="handelClick('area',item.country_id)">{{item.country_name}}</view>
          </view>
        </view>
        <view class="content-center-condition-type">
          <text>年份:</text>
          <view class="content-center-condition-type-btn">
            <view class="active" @click="handelClick('years',1)">全部</view>
            <view>2011</view>
            <view>2019</view>
          </view>
        </view>
      </view>
      <view class="content-box">
        <view class="content-center-list">
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <view>
            <text>我的姐姐</text>
            <text>8.9</text>
          </view>
          <view>Sister</view>
          <view>
            <text>剧情 家庭</text>
            <text>127m</text>
          </view>
          <view>
            <text>2012-12-12</text>
            <text>大陆</text>
          </view>
          <view>张子枫 小样 朱媛媛 王小二</view>
        </view>
        <view class="content-center-list">
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <view class="content-center-list-item">
            <text>我的姐姐</text>
            <text class="red">8.9</text>
          </view>
          <view>Sister</view>
          <view class="content-center-list-item">
            <text>剧情 家庭</text>
            <text>127m</text>
          </view>
          <view class="content-center-list-item">
            <text>2012-12-12</text>
            <text>大陆</text>
          </view>
          <view>张子枫 小样 朱媛媛 王小二</view>
        </view>
        <view class="content-center-list">
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <view class="content-center-list-item">
            <text>我的姐姐</text>
            <text class="red">8.9</text>
          </view>
          <view>Sister</view>
          <view class="content-center-list-item">
            <text>剧情 家庭</text>
            <text>127m</text>
          </view>
          <view class="content-center-list-item">
            <text>2012-12-12</text>
            <text>大陆</text>
          </view>
          <view>张子枫 小样 朱媛媛 王小二</view>
        </view>
      </view>
    </view>
    <view class="content-footer"> footer </view>
  </view>
</template>
<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const areaList =ref([{country_id:1,country_name:'全部'}])
const areaType = ref(0)
const handelClick = (type,id) => {
  console.log(type, id);

};
 const getAreaList = ()=>{
  console.log('11233')
   axios.get("http://localhost:8888/country").then((res) => {
    areaList.value.push(...res.data);
    console.log(areaList.value);
  });
 }
 onMounted(()=>{
  console.log('1122434533')

  getAreaList()
 })
</script>
<style lang="scss" scoped>
.content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  .content-center {
    flex: 1 0 auto;

    margin: 0 10rpx;
    font-size: 26rpx;
    .content-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .content-center-list {
      margin-bottom: 20rpx;
      background-color: #fff;
      width: 316rpx;
      padding: 20rpx;
      border-radius: 5rpx;
      box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.06);
      color: rgba(0, 0, 0, 0.65);
      img {
        width: 100%;
        height: 460rpx;
      }
      .red {
        color: red;
        font-size: 28rpx;
      }
      .content-center-list-item {
        display: flex;
        justify-content: space-between;
      }
    }
    .content-center-condition {
      background-color: #fff;
      box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.06);
      .content-center-condition-type {
        display: flex;
        padding: 20rpx;
        text {
          padding-right: 20rpx;
          min-width: 60rpx;
        }
        .content-center-condition-type-btn {
          display: flex;
          flex-wrap: wrap;
          color: rgba(0, 0, 0, 0.65);

          view {
            border-radius: 10rpx;
            padding: 4rpx 12rpx;
            margin-right: 20rpx;
          }
          .active {
            background-color: #f72b53;
            color: #fff;
          }
        }
      }
    }
  }
  .content-header {
    height: 100rpx;
    flex: 0 0 auto;
    background-color: aqua;
  }
  .content-footer {
    height: 100rpx;
    flex: 0 0 auto;
    background-color: palegoldenrod;
  }
}
</style>
