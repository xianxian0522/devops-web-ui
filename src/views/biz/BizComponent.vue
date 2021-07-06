<template>
  <div >
    <div class="biz-title">
      <p>{{ bizInfo?.Name }}</p>
      <p>{{ bizInfo?.DisplayName }}</p>
      <p>{{ bizInfo?.Comment }}</p>
    </div>
    <BizSetApp :setting="false" />
  </div>
</template>

<script lang="ts">
import bizInfoRepositories from "@/composable/bizInfoRepositories";
import BizSetApp from "@/views/biz/BizSetApp.vue";

export default {
  name: "BizComponent",
  components: {
    BizSetApp,
  },
  setup() {
    const { bizInfo } = bizInfoRepositories()

    return {
      bizInfo,
    }
  }
};
</script>

<style scoped lang="less">
.biz-title {
  min-width: 300px;
  width: fit-content;
  border: 1px solid #f0f0f0;
  margin-right: 30px;
  text-align: left;
  margin-bottom: 20px;
  p {
    margin: 0;
    padding: 10px 20px;
    font-size: 12px;
  }
  p:nth-of-type(1) {
    border-bottom: 1px solid #f0f0f0;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
