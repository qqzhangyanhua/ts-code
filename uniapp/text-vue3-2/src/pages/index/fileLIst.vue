<!--
 * @Author: ZYH
 * @Date: 2022-08-19 08:36:16
 * @LastEditTime: 2022-08-19 09:00:57
 * @Description: 
-->
<template>
  <view class="content-center-list">
    <image class="img" :src="`${urls.IMAGE_URL + item.film_cover_image}`" />
    <view>
      <text>{{ item.film_name }}</text>
      <text class="red">8.9</text>
    </view>
    <view>{{ item.film_title }}</view>
    <view>
      <text>剧情 家庭</text>
      <text>127m</text>
    </view>
    <view>
      <text>{{ item.film_release_date }}</text>
      <text v-for="e in item.country_list" :key="e.country_id">{{
        e.country_name
      }}</text>
    </view>
    <view>
      <text v-for="el in item.actor_list" :key="el.actor_id">{{
        el.actor_name
      }}</text>
    </view>
  </view>
</template>
<script setup>
import { urls } from "../../../config";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="scss" scoped>
.content-center-list {
  margin-bottom: 20rpx;
  background-color: #fff;
  width: 316rpx;
  padding: 20rpx;
  border-radius: 5rpx;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.65);
  .img {
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
</style>
