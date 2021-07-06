<template>
<div>
  <CommonMembers :members="bizMembers" :id="bizId" @updateMembers="updateMembers"/>
</div>
</template>

<script lang="ts">

import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { Members } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { useRoute } from "vue-router";
import bizMemberRepositories from "@/composable/bizMemberRepositories";

export default {
  name: "BizMembers",
  components: {
    CommonMembers: defineAsyncComponent(() => import('@/components/CommonMembers.vue'))
  },
  setup() {
    const route = useRoute()
    const bizId = ref(parseInt(route.query.bizId as string, 10))
    const { getMembers, bizMembers } = bizMemberRepositories()

    const updateMembers = () => {
      getMembers()
    }

    return {
      bizMembers,
      bizId,
      updateMembers,
    }
  }
};
</script>

<style scoped lang="less">

</style>
