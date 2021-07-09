<template>
<div>
  <CommonBreadcrumb >
    <template v-slot:first>
      <router-link :to="{ path: '/biz/app-settings', query: { bizId: bizId } }">biz</router-link>
    </template>
    <template v-slot:second>members</template>
  </CommonBreadcrumb>
  <CommonMembers :members="appMembers" :app="true" :id="appId" @updateMembers="updateMembers"/>
</div>
</template>

<script lang="ts">
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
    const { getMembers, appMembers, appId, bizId} = appMemberRepositories()

    const updateMembers = () => {
      getMembers()
    }

    return {
      bizId,
      appId,
      appMembers,
      updateMembers,
    }
  }
};
</script>

<style scoped lang="less">

</style>
