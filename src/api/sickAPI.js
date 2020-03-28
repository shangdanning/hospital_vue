/**
 * Created by shangdanning on 2019/11/06.
 * 推荐使用restful风格
 * 疾病相关接口
 */

export const sickAPI = {
  baseInfo: {
    url: "/ftfj/intelligence/baseInfo",
    method: "post",
    mock: 1
  },
  importData: {
    url: "/ftfj/intelligence/importData",
    method: "post",
    timeout: 15000,
    headers: {
      "Content-type": "multipart/form-data"
    }
  }
};
