<template>
  <div class="biz-common-content">
    <div class="biz-title">
      <div >
        <p>{{ bizInfo?.Name }}</p>
        <p>{{ bizInfo?.DisplayName }}</p>
        <p>{{ bizInfo?.Comment }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import bizInfoRepositories from "@/composable/bizInfoRepositories";
import { useRoute } from "vue-router";

export default {
  name: "BizComponent",
  setup() {
    const route = useRoute()
    const bizId = ref(parseInt(route.query.bizId as string, 10))
    const { bizInfo } = bizInfoRepositories(bizId.value)

    return {
      bizInfo,
    }
  }
};
</script>

<style scoped lang="less">
.biz-common-content {
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  justify-content: space-between;
}
.biz-title {
  min-width: 300px;
  width: fit-content;
  border: 1px solid #f0f0f0;
  margin-right: 30px;
  text-align: left;
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
