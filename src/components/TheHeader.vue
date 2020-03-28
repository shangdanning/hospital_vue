<template>
  <el-row>
    <el-col :span="24">
      <div class="head-wrap">
        <icon name="cogs"></icon> 抗NMDAR脑炎数据库

        <el-button type="primary"
                   @click="exit()">退出</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { MU_SET_LOGGED } from "@/common/business/constants";
export default {
  data () {
    return {};
  },
  methods: {
    exit () {
      // 设置未登录状态
      this.$store.commit(MU_SET_LOGGED, false);
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
.head-wrap {
}
</style>
