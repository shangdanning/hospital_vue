import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    // 默认主页
    path: "/home",
    name: "Home",
    redirect: "/sickEnce/SickEnceList"
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(
    //     /* webpackChunkName: "about" */ "../views/sickEnce/SickEnceList.vue"
    //   )
  }
  // ,{
  //   // 虽然URL是不区分大小写的。path的名称和文件夹名称保持一致，为了规范
  //   path: "/sickEnce",
  //   name: "sickEnce",
  //   component: () => import("../views/sickEnce/SickEnceList.vue")
  // }
];
const router = new VueRouter({
  routes
});
export default router;
