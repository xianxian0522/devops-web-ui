<template>
<div>
  <CommonBreadcrumb >
    <template v-slot:first>
      <router-link to="">biz</router-link>
    </template>
    <template v-slot:second>members</template>
  </CommonBreadcrumb>
  <CommonMembers :members="appMembers" :app="true" :id="appId" @updateMembers="updateMembers"/>
</div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineAsyncComponent, ref } from "vue";
import appMemberRepositories from "@/composable/appMemberRepositories";
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";

export default {
  name: "AppMembers",
  components: {
    CommonBreadcrumb,
    CommonMembers: defineAsyncComponent(() => import('@/components/CommonMembers.vue'))
  },
  setup() {
    const route = useRoute()
    const appId = ref(parseInt(route.params.appId as string, 10))
    const { getMembers, appMembers } = appMemberRepositories()

    const updateMembers = () => {
      getMembers()
    }

    return {
      appId,
      appMembers,
      updateMembers,
    }
  }
};
</script>

<style scoped lang="less">

</style>
