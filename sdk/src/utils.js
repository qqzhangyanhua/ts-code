const UUID = require("uuid-js");
import dayjs from "dayjs";
//一天的毫秒
const DAY = 86400000;
//根据dom获取xpath的
export function getXpath(ele) {
  let cur = ele;
  const path = [];
  while (cur.nodeType === Node.ELEMENT_NODE) {
    const currentTag = cur.nodeName.toLowerCase();
    const nth = findIndex(cur, currentTag);
    path.push(`${cur.tagName.toLowerCase()}${nth === 1 ? "" : `[${nth}]`}`);
    cur = cur.parentNode;
  }
  return `/${path.reverse().join("/")}`;
}
// 其中 findIndex 代码如下：
function findIndex(ele, currentTag) {
  let nth = 0;
  while (ele) {
    if (ele.nodeName.toLowerCase() === currentTag) nth += 1;
    ele = ele.previousElementSibling;
  }
  return nth;
}
//根据xpath反选找到dom（备注：如果是svg）
export function getEleByXpath(xpath) {
  const doc = document;
  const result = doc.evaluate(xpath, doc);
  const item = result.iterateNext();
  return item;
}
export function setCookie(name, value, days, domain) {
  const doc = document;
  if (value === null) {
    return;
  }
  if (domain === undefined || domain === null) {
    // 去除host中的端口部分
    domain = stringSplice(window.location.host, "", ":", "");
  }
  if (days === undefined || days === null || days === "") {
    doc.cookie = name + "=" + value + ";domain=" + domain + ";path=/";
  } else {
    var now = new Date();
    var time = now.getTime() + DAY * days;
    now.setTime(time);
    doc.cookie =
      name +
      "=" +
      value +
      ";domain=" +
      domain +
      ";expires=" +
      now.toUTCString() +
      ";path/";
  }
}
const stringSplice = (str, start, end, pass) => {
  if (str === "") {
    return "";
  }
  pass = pass === "" ? "=" : pass;
  start += pass;
  var ps = str.indexOf(start);
  ps = ps > 0 ? ps + start.length : 0;
  var pe = str.indexOf(end, ps);
  pe = pe > 0 ? pe : str.length;
  return str.substring(ps, pe);
};
export function getCookie(name) {
  if (name === undefined || name === null) {
    return;
  }
  var reg = RegExp(name);
  if (reg.test(document.cookie)) {
    return stringSplice(document.cookie, name, ";", "");
  }
}
//会话id
export const getSessionId = () => {
  const uuid = UUID.create();
  return uuid.hex;
};
// 设备id，读取cookie，不存在则种入cookie
export const getDeviceId = (cookieName) => {
  let did = getCookie(cookieName);
  if (!did) {
    did = UUID.create();
    setCookie(cookieName, did, 365);
  }
  return did;
};
// 发送事件，目前用img
export const getReport = (src) => {
  const img = new Image();
  img.src = src;
};
export const formatTime = () => {
  return dayjs().format("YYYY-MM-DD HH:MM:ss");
};
