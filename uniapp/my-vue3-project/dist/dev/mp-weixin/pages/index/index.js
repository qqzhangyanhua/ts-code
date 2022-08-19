"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const areaList = common_vendor.ref([{ country_id: 1, country_name: "\u5168\u90E8" }]);
    const videoTypeList = common_vendor.ref([{ category_id: 1, category_name: "\u5168\u90E8" }]);
    const videoType = common_vendor.ref(1);
    const areaType = common_vendor.ref(1);
    const dataList = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const isOverscroll = common_vendor.ref(false);
    const yearsList = [
      { year_id: 1, year_name: "\u5168\u90E8" },
      { year_id: 2, year_name: "2021" },
      { year_id: 3, year_name: "2019" },
      { year_id: 4, year_name: "2018" }
    ];
    const imgUrl = "http://127.0.0.1:5500/public/img/";
    const yearsType = common_vendor.ref(1);
    const handelClick = (type, id) => {
      console.log(type, id);
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
      common_vendor.index.request({
        url: "http://localhost:8888/country",
        success: (res) => {
          console.log(res.data);
          areaList.value.push(...res.data);
        }
      });
    };
    const getVideoTypeList = () => {
      common_vendor.index.request({
        url: "http://localhost:8888/category",
        success: (res) => {
          videoTypeList.value.push(...res.data);
        }
      });
    };
    const getList = () => {
      const params = {
        page: page.value,
        areaType: areaType.value,
        yearsType: yearsType.value,
        videoType: videoType.value
      };
      common_vendor.index.request({
        url: "http://localhost:8888/film",
        data: params,
        success: (res) => {
          if (res.data.length == 0) {
            isOverscroll.value = true;
          }
          dataList.value.push(...res.data);
        }
      });
    };
    const scrollEvent = () => {
      if (isOverscroll.value)
        return;
      console.log("34534534");
      page.value++;
      getList();
    };
    common_vendor.onMounted(() => {
      getAreaList();
      getVideoTypeList();
      getList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(videoTypeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.category_name),
            b: item.category_id == videoType.value ? 1 : "",
            c: item.category_id,
            d: common_vendor.o(($event) => handelClick("video", item.category_id), item.category_id)
          };
        }),
        b: common_vendor.f(areaList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.country_name),
            b: item.country_id == areaType.value ? 1 : "",
            c: item.country_id,
            d: common_vendor.o(($event) => handelClick("area", item.country_id), item.country_id)
          };
        }),
        c: common_vendor.f(yearsList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.year_name),
            b: item.year_id == yearsType.value ? 1 : "",
            c: item.year_id,
            d: common_vendor.o(($event) => handelClick("years", item.year_id), item.year_id)
          };
        }),
        d: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: `${imgUrl + item.film_cover_image}`,
            b: common_vendor.t(item.film_name),
            c: common_vendor.t(item.film_title),
            d: common_vendor.t(item.film_release_date),
            e: common_vendor.f(item.country_list, (e, k1, i1) => {
              return {
                a: common_vendor.t(e.country_name),
                b: e.country_id
              };
            }),
            f: common_vendor.f(item.actor_list, (el, k1, i1) => {
              return {
                a: common_vendor.t(el.actor_name),
                b: el.actor_id
              };
            }),
            g: item.film_id
          };
        }),
        e: dataList.value.length == 0
      }, dataList.value.length == 0 ? {} : {}, {
        f: common_vendor.o(scrollEvent)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"], ["__file", "/Users/zhangyanhua/Desktop/working/ts-code/uniapp/my-vue3-project/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
