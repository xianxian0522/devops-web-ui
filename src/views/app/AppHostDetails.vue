<template>
<div>
  <CommonBreadcrumb>
    <template v-slot:first>app</template>
    <template v-slot:second>host</template>
  </CommonBreadcrumb>
  <CommonHost :host-list="hostList" :id="appId">
    <template v-slot:default="slotProps">
      <a-button type="link" >分配{{slotProps.host.ID}}</a-button>
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
