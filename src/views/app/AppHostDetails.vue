<template>
<div>
  <CommonBreadcrumb>
    <template v-slot:first>app</template>
    <template v-slot:second>host</template>
  </CommonBreadcrumb>
  <CommonHost :host-list="hostList" :id="appId">
    <template v-slot:default="slotProps">
      <a-button type="link" >
        <router-link :to="{path: 'host-details/instance/' + slotProps.host.ID}">实例</router-link>
      </a-button>
      <a-button type="link" >终端</a-button>
    </template>
  </CommonHost>
</div>
</template>

<script lang="ts">
import appHostRepositories from "@/composable/appHostRepositories";
import CommonHost from "@/components/CommonHost.vue";
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";

export default {
  name: "AppHostDetails",
  components: { CommonHost, CommonBreadcrumb },
  setup() {
    const { appId, hostList } = appHostRepositories()

    return {
      appId,
      hostList,
    }

  }
};
</script>

<style scoped lang="less">

</style>
