/**
 * Created by shangdanning on 2019/11/09.
 * 系统相关的状态管理
 */
import {
  MU_SET_LOGGED,
  MU_SYS_MENU,
  AC_SYS_MENU,
  MU_SET_ROUTER
} from "@/common/business/constants";
import { service } from "@/api/globalAccess";
import router from "@/router";
let state = {
  // 系统是否已登录
  isLogged: false,
  // 系统菜单
  sysMenu: [],
  routerList: []
};
let mutations = {
  [MU_SET_LOGGED]: (state, data) => {
    state.isLogged = data;
  },
  [MU_SYS_MENU]: (state, data) => {
    state.sysMenu = data;
  },
  [MU_SET_ROUTER]: (state, data) => {
    state.routerList = data;
  }
};
let actions = {
  // 获取系统菜单
  async [AC_SYS_MENU] ({ commit }) {
    const data = await service("systemAPI", "systemMenu");
    let routerList = methods.addRoutes(data.list);
    commit(MU_SYS_MENU, data.list);
    commit(MU_SET_ROUTER, routerList);
  }
};
var methods = {
  addRoutes (menu) {
    var routerList = [];
    menu.forEach(item => {
      item.sub.forEach(sub => {
        routerList.push({
          path: `${sub.componentName}`,
          name: sub.componentName.substring(
            sub.componentName.lastIndexOf("/") + 1
          ),
          component: () => import(`@/views${sub.componentName}`)
        });
      });
    });
    routerList.push({
      path: "*",
      name: "NotFound",
      component: () => import("@/views/system/NotFound")
    });
    router.addRoutes(routerList);
    return routerList;
  }
};

export default {
  state,
  actions,
  mutations
};
