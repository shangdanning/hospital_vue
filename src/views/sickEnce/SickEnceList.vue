<template>
  <div>列表</div>
</template>
<script>
export default {
  data () {
    return {};
  },
  created () {
    this.$http("sickAPI", "baseInfo", { name: "sdn" }).then(data => {
      console.log(data);
    });
  }
};
</script>
