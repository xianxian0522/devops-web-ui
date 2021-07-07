<template>
<div>
  <CommonHost :host-list="hostList" >
    <template v-slot:default="slotProps">
      <a-button type="link" @click="showModal(slotProps.host)">分配</a-button>
    </template>
  </CommonHost>

  <a-modal v-model:visible="visible" title="分配应用" @ok="distributionApp">
    <div style="width: 100%">
      <a-select
        mode="multiple"
        placeholder="Please select App"
        show-search
        style="width: 100%;"
        v-model:value="appsId"
      >
        <a-select-option v-for="option in appList" :key="option.ID" :value="option.ID">{{ option.Name }}</a-select-option>
      </a-select>
    </div>
  </a-modal>
</div>
</template>

<script lang="ts">
import bizHostRepositories from "@/composable/bizHostRepositories";
import { reactive, ref, toRefs, UnwrapRef, watch } from "vue";
import { AppResponse, Hosts } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import CommonHost from "@/components/CommonHost.vue";
import { message } from "ant-design-vue";

export interface Modal {
  visible: boolean;
  appsId: number[];
  oldAppsId: number[];
  appList: AppResponse[],
  hostId: number,
}

export default {
  name: "BizHostDetails",
  components: { CommonHost },
  setup() {
    const { bizId, hostList, getHost } = bizHostRepositories()

    const modalState: UnwrapRef<Modal> = reactive({
      visible: false,
      appsId: [],
      oldAppsId: [],
      appList: [],
      hostId: 0,
    })
    const getApp = async () => {
      try {
        modalState.appList = await devopsRepository.queryAppByBizId(bizId.value)
      } catch (e) {
        console.error(e)
      }
    }
    const showModal = (host: Hosts) => {
      modalState.visible = true
      modalState.appsId = []
      modalState.hostId = host.ID
      if (host.Apps) {
        const appsId = host.Apps.map((app: AppResponse) => app.ID)
        modalState.oldAppsId = appsId
        modalState.appsId = appsId
      }
      getApp()
    }
    const distributionApp = async () => {
      try {
        const value = modalState.appsId;
        await modalState.oldAppsId.map(oldAppId => {
          if (!value.includes(oldAppId)) {
            devopsRepository.deleteDistributionHostToApp(bizId.value, oldAppId, modalState.hostId)
          }
        });
        await value.map(appId => {
          if (!modalState.oldAppsId.includes(appId)) {
            devopsRepository.distributionHostToApp(bizId.value, appId, modalState.hostId)
          }
        });
        modalState.visible = false
        message.success('分配成功')
        await getHost()
      } catch (e) {
        console.error(e)
      }
    }

    return {
      hostList,
      ...toRefs(modalState),
      showModal,
      distributionApp,
    }
  }
};
</script>

<style scoped lang="less">

</style>
