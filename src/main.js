import Vue from "vue";
import router from "./router";
// Vuex
import store from "./store";
// element-ui相关
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 时间格式化
import moment from "moment";
import App from "./App.vue";
// http请求相关
import { service } from "./api/globalAccess";
// css reset
import "normalize.css";
// icon库
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import { MU_SET_LOGGED } from "@/common/business/constants";
Vue.prototype.$http = service;
Vue.prototype.$moment = moment;
// 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.component("icon", Icon);
Vue.config.productionTip = false;
// 在生产环境下,不需要引入mock数据
if (process.env.NODE_ENV !== "production") {
  require("./mock/index");
}
//= ================== 基础组件的自动化全局注册========================================
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名
  const componentName =
    // 获取和目录深度无关的文件名
    fileName
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});
//= ===================================================================================
// 在路由完成初始导航时调用
router.onReady(() => {
  var routerList = store.state.system.routerList;
  if (routerList.length !== 0) {
    routerList.forEach(item => {
      item.component = () => import(`@/views${item.path}`);
    });
    routerList.push({
      path: "*",
      name: "NotFound",
      component: () => import("@/views/system/NotFound")
    });
    router.addRoutes(routerList);
  }
});
router.beforeEach((to, from, next) => {
  // 清除已登录状态
  if (to.name === "Login") {
    store.commit(MU_SET_LOGGED, false);
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
