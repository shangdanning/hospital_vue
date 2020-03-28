<template>
  <div class="login">
    <el-button type="primary"
               @click="login()">登录</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { MU_SET_LOGGED, AC_SYS_MENU } from "@/common/business/constants";
export default {
  methods: {
    login() {
      this.$router.push({ path: "/home" });
      // 设置已登录状态
      this.$store.commit(MU_SET_LOGGED, true);
      this.getMenu();
    },
    ...mapActions({
      getMenu: AC_SYS_MENU
    })
  }
};
</script>

<style>
</style>
