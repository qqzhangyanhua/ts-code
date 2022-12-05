//  可視化賣點
import qs from "qs";
import { getXpath, getDeviceId, getSessionId } from "./utils";

const handelHistory = (options) => {
  const newParams = nxReport.registerParams();
  newParams.timeStamp = new Date().getTime();
  newParams.type = "historyChange";
  const img = new Image();
  const { url, appKey } = options;
  const obj = Object.assign({}, newParams, {
    appKey,
  });
  const params = qs.stringify(obj);
  img.src = `${url}?${params}`;
};
const initHistoryChange = (options) => {
  (function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
      if (typeof history.onpushstate == "function") {
        history.onpushstate({ state: state });
      }
      handelHistory(options);
      return pushState.apply(history, arguments);
    };
  })(window.history);
};

//  history模式切换路由的时候不能触发popstate事件，所以需要用pushState来监听
export class NxReport {
  static startTime = 0;
  static dwellTime = 0;
  static dwellClickTime = 0;
  constructor() {
    this.params = {};
    this.startTime = new Date().getTime(); //页面开始时间
  }
  handelAutoReport(ev) {
    console.log("time统计====did=====", this.params);
    const dwellClickTime =
      new Date().getTime() - this.startTime + this.dwellClickTime;
    this.reportTo({
      type: "click",
      xpath: getXpath(ev.target),
      target: ev.target.tagName,
      dwellClickTime: dwellClickTime,
      innerText: ev.target.innerHTML.slice(0, 20).trim(), //最多截取前20个字符
      ...this.params,
    });
  }
  initVisibilitychange() {
    //监听页面切换可是窗口，如果页面离开的时候统计就不再记时需要在这里处理
    // TODO
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        // 切换到后台停止记时
        console.log("页面切换到后台");
        this.dwellTime += new Date().getTime() - this.startTime;
        this.dwellClickTime += new Date().getTime() - this.startTime;
      } else {
        this.startTime = new Date().getTime();
        console.log("页面切换到前台", this.dwellClickTime);
      }
    });
  }
  initLoad() {
    // 页面加载完成后上报
    window.addEventListener("load", (event) => {
      this.reportTo({
        type: "onload",
        ...this.params,
      });
      this.startTime = new Date().getTime();
      console.log("页面加载完成", event);
    });
    window.addEventListener(
      "beforeunload",
      this.beforeUnloadListener.bind(this)
    );
  }
  beforeUnloadListener() {
    // 页面关闭上报
    this.reportTo({
      type: "beforeunload",
      ...this.params,
    });
  }
  initHashchange() {
    window.addEventListener("hashchange", (event) => {
      const { newURL } = event;
      const endTime = new Date().getTime();
      this.dwellTime += endTime - this.startTime;
      console.log("页面切换", endTime - this.startTime);
      this.reportTo({
        type: "routeChange",
        url: newURL,
        ...this.params,
      });
      console.log("event===", event);
    });
  }
  //自動上報点击事件
  initAuthReport() {
    document.body.addEventListener(
      "click",
      this.handelAutoReport.bind(this),
      false
    );
  }
  //关闭上报点击事件
  dispose() {
    document.body.removeEventListener(
      "click",
      this.handelAutoReport.bind(this),
      false
    );
  }
  init(options, reportParams = {}) {
    //合并上传的参数
    this.params = Object.assign({}, reportParams, initParams());
    this.config = Object.assign({}, options, this.config);
    console.log("options:", this.config);
    this.initAuthReport();
    this.initVisibilitychange();
    this.initLoad();
    if (options.mode === "history") {
      initHistoryChange(options);
    } else {
      this.initHashchange();
    }
  }
  reportTo(msg) {
    msg.timeStamp = new Date().getTime();
    const img = new Image();
    const { url, appKey } = this.config;
    const obj = Object.assign({}, msg, {
      appKey,
    });
    const params = qs.stringify(obj);
    img.src = `${url}?${params}`;
    // axios.get(`${url}?${params}`);
    this.dwellClickTime = 0;
    this.dwellTime = 0;
    this.startTime = new Date().getTime();
    console.log("上报之后统计时间归0=====", this.dwellClickTime);
  }
  track(params) {
    // 可以用来发送请求通过appkey来换取唯一的用户id
    this.reportTo({ type: "init", ...params });
  }
  registerParams(params = {}) {
    this.params = Object.assign({}, this.params, params);
    return this.params;
  }
  handelReport(params = {}) {
    const msg = Object.assign({}, params, this.params);
    this.reportTo(msg);
  }
}

const initParams = () => {
  const deviceId = getDeviceId("bp_did");
  const sid = getSessionId();
  const params = {
    sid: sid,
    did: deviceId,
    url: window.location.href,
    domain: document.domain || "", //domain
    title: document.title || "", //当前页面的title
    referer: document.referrer || "", //为空则是当前页面否则就是跳转进来的路径
    sh: window.screen.height || 0,
    ua: navigator.userAgent || "", //浏览器信息
    lang: navigator.language || "", //语言
    sw: window.screen.width || 0,
  };
  return params;
};
// const nxReport = new NxReport();
// 后期考虑用自执行函数，目前先挂载在window
// function Shell(window) {
//   if (!window.nxReport) {
//     window.nxReport = nxReport;
//   }
// }

// Shell(window);
export const nxReport = new NxReport();
// module.exports = nxReport;
