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
        <a-button type="link" >分配 {{ record.ID }}</a-button>
      </div>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import bizHostRepositories from "@/composable/bizHostRepositories";
import { reactive, ref, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { Hosts } from "@/utils/response";
import * as _ from "lodash";

export default {
  name: "BizHostDetails",
  setup() {
    const { bizId, hostList, data } = bizHostRepositories()
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
      paginationChange,
    }
  }
};
</script>

<style scoped lang="less">

</style>
