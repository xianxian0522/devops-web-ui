<template>
<div>
  <a-form :model="formState" layout="inline">
    <a-form-item label="主机名" >
      <a-input v-model:value="formState.Username" placeholder="主机名" />
    </a-form-item>
    <a-form-item label="内网IP">
      <a-input v-model:value="formState.Username" placeholder="内网IP" />
    </a-form-item>
  </a-form>
</div>
</template>

<script lang="ts">
import bizHostRepositories from "@/composable/bizHostRepositories";
import { reactive } from "vue";

export default {
  name: "BizHostDetails",
  setup() {
    const { bizId, hostList } = bizHostRepositories()
    const formState = reactive({
      Hostname: '',
      InnerIP: '',
    })

    return {
      formState,
    }
  }
};
</script>

<style scoped lang="less">

</style>
