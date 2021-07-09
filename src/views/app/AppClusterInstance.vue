<template>
<div>
  <CommonBreadcrumb :three="true">
    <template v-slot:first>app</template>
    <template v-slot:second>cluster</template>
    <template v-slot:three>instance</template>
  </CommonBreadcrumb>
  <CommonTree :nodes-tree="nodesTree" />
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import CommonTree from "@/components/CommonTree.vue";
import rsRepositories from "@/composable/rsRepositories";

export default {
  name: "AppClusterInstance",
  components: {
    CommonBreadcrumb,
    CommonTree,
  },
  setup() {
    const { rsList, nodesTree } = rsRepositories()

    return {
      nodesTree,
    }
  }
};
</script>

<style scoped lang="less">

</style>
