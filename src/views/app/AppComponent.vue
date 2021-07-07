<template>
<div>
  <CommonBreadcrumb >
    <template v-slot:first>
      <router-link to="">biz</router-link>
    </template>
    <template v-slot:second>app</template>
  </CommonBreadcrumb>
  <div class="app-title">
    <p>{{ appInfo?.Name }}</p>
    <p>{{ appInfo?.DisplayName }}</p>
    <p>{{ appInfo?.Comment }}</p>
  </div>
  <div class="app-footer">
    <span>源代码地址</span>
    <router-link to="">GITLAB</router-link>
  </div>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import appInfoRepositories from "@/composable/appInfoRepositories";

export default {
  name: "AppComponent",
  components: { CommonBreadcrumb },
  setup() {
    const { appInfo } = appInfoRepositories()

    return {
      appInfo,
    }
  }
};
</script>

<style scoped lang="less">
.app-title {
  width: 100%;
  border: 1px solid #f0f0f0;
  margin-right: 30px;
  text-align: left;
  margin-bottom: 50px;
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
.app-footer {
  a {
    margin-left: 40px;
  }
}
</style>
