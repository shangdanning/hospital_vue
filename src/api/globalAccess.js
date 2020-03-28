/**
 * Created by shangdanning on 2019/11/06.
 * 全局访问api模块
 */
import Http from "@/common/utils/http";
import { sickAPI } from "./sickAPI";
import { systemAPI } from "./systemAPI";

export const service = function (apiModule, apiName, data) {
  // 先存映射表，为了将字符串value映射成模块
  var apiArray = { sickAPI: sickAPI, systemAPI: systemAPI };
  var requestModule = apiArray[apiModule];
  let apiConfig = requestModule[apiName];
  // 将请求信息深拷贝
  var requestConfig = JSON.parse(JSON.stringify(apiConfig));
  requestConfig.data = data;
  if (apiConfig.mock && process.env.NODE_ENV !== "production") {
    // 处理Mock的情况
    requestConfig.url += "Mock";
  }
  return Http(requestConfig);
};
