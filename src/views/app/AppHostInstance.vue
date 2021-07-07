<template>
<div>
  <CommonBreadcrumb :three="true">
    <template v-slot:first>app</template>
    <template v-slot:second>host</template>
    <template v-slot:three>instance</template>
  </CommonBreadcrumb>

  <a-form :model="formState" layout="inline" style="margin-bottom: 20px">
    <a-form-item label="名字" >
      <a-input v-model:value="formState.Name" placeholder="名字" />
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data-source="data" :row-key="(record) => record.ID"
           @change="paginationChange" :scroll="{ x: 1600 }"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import { reactive, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import appInstanceRepositories from "@/composable/appInstanceRepositories";
import * as _ from "lodash";
import { Instance } from "@/utils/response";

export default {
  name: "AppHostInstance",
  components: { CommonBreadcrumb },
  setup() {
    const { data, instanceList, } = appInstanceRepositories()
    const formState = reactive({
      Name: '',
    })
    const columns = [
      { dataIndex: 'Name', key: 'Name', title: '实例名', fixed: 'left', width: 180},
      { dataIndex: 'State', key: 'State', title: '状态'},
      { dataIndex: 'Comment', key: 'Comment', title: '描述',},
      { dataIndex: 'User', key: 'User', title: '用户', },
      { dataIndex: 'DataDir', key: 'DataDir', title: '数据目录'},
      { dataIndex: 'LogDir', key: 'LogDir', title: '日志目录',},
      { dataIndex: 'MetricEndpoint', key: 'MetricEndpoint', title: '监控采集地址'},
      { dataIndex: 'WorkDir', key: 'WorkDir', title: '工作目录',},
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
      data.value = instanceList.value.filter((instance: Instance) => instance.Name?.indexOf(value) !== -1)
    }
    watch(() => formState.Name, _.debounce(debounceName, 300))

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
