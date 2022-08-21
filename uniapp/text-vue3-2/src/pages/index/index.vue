<template>
  <scroll-view :scroll-y="true" style="height: 100vh" @scrolltolower="handelScroll">
    <view class="content">
      <view class="content-header">header</view>
      <view class="content-center">
        <view class="content-center-condition">
          <view class="content-center-condition-type">
            <text>类型:</text>
            <view class="content-center-condition-type-btn">
              <view
                :class="{ active: item.category_id == params.videoType }"
                v-for="item in videoTypeList"
                :key="item.category_id"
                @click="handelTabClick('videoType', item.category_id)"
                >{{ item.category_name }}</view
              >
            </view>
          </view>
          <view class="content-center-condition-type">
            <text>区域:</text>
            <view class="content-center-condition-type-btn">
              <view
                :class="{ active: item.country_id == params.areaType }"
                v-for="item in areaList"
                :key="item.country_id"
                @click="handelTabClick('areaType', item.country_id)"
                >{{ item.country_name }}</view
              >
            </view>
          </view>
          <view class="content-center-condition-type">
            <text>年份:</text>
            <view class="content-center-condition-type-btn">
              <view class="active">全部</view>
            </view>
          </view>
        </view>
        <!-- <scroll-view :scroll-y="true" @scroll="scrollEvent" style="height: 600px;"> -->
        <view class="content-box">
          <FileList v-for="item in dataList" :item="item" />
          <view v-if="dataList.length ==0" class="no-empty ">暂无数据</view>
        </view>
      </view>
      <view class="content-footer"> footer </view>
    </view>
  </scroll-view>
</template>

<script setup>
import FileList from "./fileLIst.vue";
import { urls } from "../../../config";
import { onMounted, ref, reactive } from "vue";
const dataList = ref([]);
const areaList = ref([{ country_id: 1, country_name: "全部" }]);
const videoTypeList = ref([{ category_id: 1, category_name: "全部" }]);
const yearsList = [
  { year_id: 1, year_name: "全部" },
  { year_id: 2, year_name: "2021" },
  { year_id: 3, year_name: "2019" },
  { year_id: 4, year_name: "2018" },
];
const params = reactive({
  areaType: 1,
  yearsType: 1,
  page: 1,
  videoType: 1,
});
const isOverscroll =ref(false)
const handelTabClick = (type, val) => {
  params[type] = val;
  params.page = 1;
  dataList.value = []
  getFileList();
};
const getFileList = () => {
  isOverscroll.value =false
  uni.request({
    url: `${urls.REQUEST_URL}film`,
    data: params,
    success: (res) => {
      if(res.data?.length==0){
        isOverscroll.value = true
      }
      dataList.value.push(...res.data);
    },
  });
};
const getAreaList = () => {
  uni.request({
    url: `${urls.REQUEST_URL}country`,
    success: (res) => {
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
const handelScroll = ()=>{
  if(isOverscroll.value) return
  params.page++;
  getFileList();
  console.log('564756757')
}
onMounted(() => {
  getFileList();
  getVideoTypeList();
  getAreaList();
});
</script>

<style lang="scss">
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
