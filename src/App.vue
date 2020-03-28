<template>
  <div id="app">
    <el-container v-if="isLogged">
      <el-header class="header">
        <TheHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <TheNavMenu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else />
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import TheNavMenu from "@/components/TheNavMenu";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    TheHeader,
    TheNavMenu
  },
  computed: {
    ...mapState({
      isLogged: state => state.system.isLogged
    })
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
}
</style>
