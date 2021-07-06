<template>
<div>
  <CommonMembers :members="bizMembers"/>
</div>
</template>

<script lang="ts">

import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { Members } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { useRoute } from "vue-router";

export default {
  name: "BizMembers",
  components: {
    CommonMembers: defineAsyncComponent(() => import('@/components/CommonMembers.vue'))
  },
  setup() {
    const route = useRoute()
    const bizId = ref(parseInt(route.query.bizId as string, 10))
    const bizMembers = ref<Members[]>([])
    const getMembers = async () => {
      try {
        bizMembers.value = await devopsRepository.queryMembersByBizId(bizId.value)
        console.log(bizMembers.value,' [[[')
      } catch (e) {
        console.error(e)
      }
    }
    onMounted(() => {
      getMembers()
    })
    watch(() => route.query, (value) => {
      const id = parseInt(value.bizId as string, 10)
      bizId.value = id
    })
    watch(bizId, () => {
      getMembers()
    })

    return {
      bizMembers,
    }
  }
};
</script>

<style scoped lang="less">

</style>
