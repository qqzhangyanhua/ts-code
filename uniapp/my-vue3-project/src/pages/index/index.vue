<template>
  <scroll-view
    :scroll-y="true"
    @scrolltolower="scrollEvent"
    style="height: 100vh"
  >
    <view class="content">
      <view class="content-header">header</view>
      <view class="content-center">
        <view class="content-center-condition">
          <view class="content-center-condition-type">
            <text>类型:</text>
            <view class="content-center-condition-type-btn">
              <view
                :class="{ active: item.category_id == videoType }"
                v-for="item in videoTypeList"
                :key="item.category_id"
                @click="handelClick('video', item.category_id)"
                >{{ item.category_name }}</view
              >
            </view>
          </view>
          <view class="content-center-condition-type">
            <text>区域:</text>
            <view class="content-center-condition-type-btn">
              <view
                :class="{ active: item.country_id == areaType }"
                v-for="item in areaList"
                :key="item.country_id"
                @click="handelClick('area', item.country_id)"
                >{{ item.country_name }}</view
              >
            </view>
          </view>
          <view class="content-center-condition-type">
            <text>年份:</text>
            <view class="content-center-condition-type-btn">
              <view
                :class="{ active: item.year_id == yearsType }"
                v-for="item in yearsList"
                :key="item.year_id"
                @click="handelClick('years', item.year_id)"
                >{{ item.year_name }}</view
              >
            </view>
          </view>
        </view>
        <!-- <scroll-view :scroll-y="true" @scroll="scrollEvent" style="height: 600px;"> -->
        <view class="content-box">
          <view
            class="content-center-list"
            v-for="item in dataList"
            :key="item.film_id"
          >
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
          <view v-if="dataList.length == 0" class="no-empty">暂无数据</view>
        </view>
        <!-- </scroll-view> -->
      </view>
      <view class="content-footer"> footer </view>
    </view>
  </scroll-view>
</template>
<script setup>
import {urls } from '../../../config'
import { onMounted, ref } from "vue";
const areaList = ref([{ country_id: 1, country_name: "全部" }]);
const videoTypeList = ref([{ category_id: 1, category_name: "全部" }]);
const videoType = ref(1);
const areaType = ref(1);
const dataList = ref([]);
const page = ref(1);
const isOverscroll = ref(false);
const yearsList = [
  { year_id: 1, year_name: "全部" },
  { year_id: 2, year_name: "2021" },
  { year_id: 3, year_name: "2019" },
  { year_id: 4, year_name: "2018" },
];
const yearsType = ref(1);


const handelClick = (type, id) => {
  console.log(type, id,urls);
  page.value = 1;
  isOverscroll.value = false;

  dataList.value = [];
  if (type == "video") {
    videoType.value = id;
  } else if (type == "area") {
    areaType.value = id;
  } else {
    yearsType.value = id;
  }
  getList();
};
const getAreaList = () => {
  uni.request({
    url: `${urls.REQUEST_URL}country`, 
    success: (res) => {
      console.log(res.data);
      areaList.value.push(...res.data);
    },
  });
};
const getVideoTypeList = () => {
  uni.request({
    url: `${urls.REQUEST_URL}category`, 
    success: (res) => {
      videoTypeList.value.push(...res.data);
    },
  });
};
const getList = () => {
  const params = {
    page: page.value,
    areaType: areaType.value,
    yearsType: yearsType.value,
    videoType: videoType.value,
  };
  uni.request({
    url: `${urls.REQUEST_URL}film`,
    data: params,
    success: (res) => {
      if (res.data.length == 0) {
        isOverscroll.value = true;
      }
      dataList.value.push(...res.data);
    },
  });
};
const scrollEvent = () => {
  if (isOverscroll.value) return;
  console.log("34534534");
  page.value++;
  getList();
};

onMounted(() => {
  getAreaList();
  getVideoTypeList();
  getList();
});
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
      overflow-y: scroll;
    }
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
.no-empty {
  text-align: center;
  padding-top: 60rpx;
  margin: 0 auto;
  font-size: 34rpx;
}
</style>
