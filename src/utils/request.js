import axios from "axios";
import { Toast } from "vant";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 70000 
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["Content-type"] = "application/json;charset=UTF-8";
    return config;
  },
  error => {
    console.log(error, "err"); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code !== "0000") {
      if (res.code == "5002") {
        //token 认证失败，跳回中国联通APP的登录页面
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        if (isAndroid) {
          js_invoke.interact('{"type":"login" ,"url":"", "msg":""}');
        } else {
          window.location = encodeURI(
            'clientAction={"type":"login" ,"url":"", "msg":""}'
          );
        }
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Toast("网络出错，请稍后重试");
    return Promise.reject(error);
  }
);

export default service;
