<template>
<div>
  <a-form :model="formState" layout="inline" style="margin-bottom: 20px">
    <a-form-item label="主机名" >
      <a-input v-model:value="formState.Hostname" placeholder="主机名" />
    </a-form-item>
    <a-form-item label="内网IP">
      <a-input v-model:value="formState.InnerIP" placeholder="内网IP" />
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data-source="data" :row-key="(record) => record.ID"
           @change="paginationChange" :scroll="{ x: 2600 }"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #tags="{ text: Apps }" >
      <div >
        <a-tag v-for="tag in Apps" :key="tag" color="processing">{{ tag.Name }}</a-tag>
      </div>
    </template>
    <template #action="{ record }" >
      <div >
        <a-button type="link" @click="showModal(record)">分配</a-button>
      </div>
    </template>
  </a-table>

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
import { TableState } from "ant-design-vue/es/table/interface";
import { AppResponse, Hosts } from "@/utils/response";
import * as _ from "lodash";
import devopsRepository from "@/api/devopsRepository";

export interface Modal {
  visible: boolean;
  appsId: number[];
  oldAppsId: number[];
  appList: AppResponse[],
  hostId: number,
}

export default {
  name: "BizHostDetails",
  setup() {
    const { bizId, hostList, data, getHost } = bizHostRepositories()
    const formState = reactive({
      Hostname: '',
      InnerIP: '',
    })
    const columns = [
      { dataIndex: 'InnerIP', key: 'InnerIP', title: '内网Ip', fixed: 'left', width: 180},
      { dataIndex: 'Hostname', key: 'Hostname', title: '主机名', fixed: 'left', width: 180},
      { dataIndex: 'Apps', key: 'Apps', title: '分配应用', slots: { customRender: 'tags', }},
      { dataIndex: 'CPU', key: 'CPU', title: 'CPU'},
      { dataIndex: 'Memory', key: 'Memory', title: '内存',},
      { dataIndex: 'MgtOutbond', key: 'MgtOutbond', title: '带外管理地址'},
      { dataIndex: 'OsName', key: 'OsName', title: '操作系统名',},
      { dataIndex: 'OsType', key: 'OsType', title: '操作系统类型'},
      { dataIndex: 'OsVersion', key: 'OsVersion', title: '操作系统版本',},
      { dataIndex: 'OsBit', key: 'OsBit', title: '操作系统位数'},
      { dataIndex: 'LgDevType', key: 'LgDevType', title: '逻辑设备类型',},
      { dataIndex: 'State', key: 'State', title: '状态'},
      { dataIndex: 'Comment', key: 'Comment', title: '备注',},
      { title: '操作', key: 'action', slots: { customRender: 'action', },
        align: 'center', width: 100, fixed: 'right'}
    ]
    const pagination = reactive({
      showSizeChanger: true,
      current: 1,
      pageSize: 10,
    })

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
        await getHost()
      } catch (e) {
        console.error(e)
      }
    }

    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }
    const debounceName = (value: string) => {
      if (formState.InnerIP) {
        data.value = hostList.value.filter((h: Hosts) => {
          return (h.InnerIP?.indexOf(formState.InnerIP) !== -1 && h.Hostname?.indexOf(value) !== -1)
        })
      } else {
        data.value = hostList.value.filter((h: Hosts) => h.Hostname?.indexOf(value) !== -1)
      }
    }
    const debounceIp = (value: string) => {
      if (formState.Hostname) {
        data.value = hostList.value.filter((h: Hosts) => {
          return (h.Hostname?.indexOf(formState.Hostname) !== -1 && h.InnerIP?.indexOf(value) !== -1)
        })
      } else {
        data.value = hostList.value.filter((h: Hosts) => h.InnerIP?.indexOf(value) !== -1)
      }
    }
    watch(() => formState.Hostname, _.debounce(debounceName, 300))
    watch(() => formState.InnerIP, _.debounce(debounceIp, 300))

    return {
      data,
      formState,
      columns,
      pagination,
      ...toRefs(modalState),
      paginationChange,
      showModal,
      distributionApp,
    }
  }
};
</script>

<style scoped lang="less">

</style>
