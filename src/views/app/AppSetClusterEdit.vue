<template>
<div>
  <CommonBreadcrumb :three="true">
    <template v-slot:first>app</template>
    <template v-slot:second>set</template>
    <template v-slot:three>cluster</template>
  </CommonBreadcrumb>
  <a-form :model="formState" layout="inline">
    <a-form-item label="集群名" >
      <a-input v-model:value="formState.Name" placeholder="集群名" />
    </a-form-item>
  </a-form>
  <a-form :model="formState" style="margin: 20px 0">
    <a-form-item label="描述" >
      <a-textarea v-model:value="formState.Comment" placeholder="描述" :rows="5" />
    </a-form-item>
  </a-form>
  <a-button @click="updateCluster" type="primary" style="margin-bottom: 20px">修改</a-button>
  <a-collapse :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="高级设置" :style="customStyle">
      <div class="set-information">
        <div class="common-margin">实例模板</div>
        <CommonForm :instance="clusterInfo?.InstanceTemplate" @updateInstance="updateInstance"/>
        <div class="common-margin">绑定机房环境</div>
        <CommonTree />
      </div>
    </a-collapse-panel>
  </a-collapse>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import CommonForm from "@/components/CommonForm.vue";
import CommonTree from "@/components/CommonTree.vue";
import { reactive, watch } from "vue";
import { CaretRightOutlined } from '@ant-design/icons-vue'
import appClusterInfoRepositories from "@/composable/appClusterInfoRepositories";
import devopsRepository from "@/api/devopsRepository";
import { message } from "ant-design-vue";
import { InstanceTemplate } from "@/utils/response";

export interface updateInstance {
  InstanceTemplate: InstanceTemplate
}

export default {
  name: "AppSetClusterEdit",
  components: {
    CommonBreadcrumb,
    CommonForm,
    CommonTree,
    CaretRightOutlined,
  },
  setup() {
    const { clusterInfo, clusterId } = appClusterInfoRepositories()
    const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    const formState = reactive({
      Name: clusterInfo.value?.Name,
      Comment: clusterInfo.value?.Comment,
    })

    const updateCluster = async () => {
      try {
        const value = {...formState}
        await devopsRepository.updateClusterByCluId(clusterId.value, value)
        message.success('修改成功')
      } catch (e) {
        console.error(e)
      }
    }
    const updateInstance = async (value: updateInstance) => {
      try {
        await devopsRepository.updateClusterByCluId(clusterId.value, value)
        message.success('修改成功')
      } catch (e) {
        console.error(e)
      }
    }

    watch(clusterInfo, value => {
      formState.Comment = value?.Comment
      formState.Name = value?.Name
    })

    return {
      formState,
      customStyle,
      clusterInfo,
      updateCluster,
      updateInstance,
    }
  }
};
</script>

<style scoped lang="less">
.common-margin {
  margin: 10px 0;
}
</style>
