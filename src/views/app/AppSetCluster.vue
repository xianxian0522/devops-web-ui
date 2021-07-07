<template>
<div>
  <CommonBreadcrumb>
    <template v-slot:first>app</template>
    <template v-slot:second>cluster</template>
  </CommonBreadcrumb>
  <div class="biz-members-content-header">
    <div>
      <a-button @click="showCreateDialog">添加</a-button>
    </div>
    <a-form :model="formState" layout="inline">
      <a-form-item label="名字" >
        <a-input v-model:value="formState.Name" placeholder="名字" />
      </a-form-item>
    </a-form>
  </div>
  <a-table :columns="columns" :data-source="data" :row-key="(record) => record.ID"
           @change="paginationChange"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }" >
      <div >
        <a-button type="link" @click="showEditDialog(record)">
          <EditOutlined />
        </a-button>
        <a-button type="link">实例配置</a-button>
      </div>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import { reactive, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { EditOutlined } from '@ant-design/icons-vue'
import appClusterRepositories from "@/composable/appClusterRepositories";
import { Cluster } from "@/utils/response";
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import * as _ from "lodash";

export default {
  name: "AppSetCluster",
  components: { EditOutlined, CommonBreadcrumb },
  setup() {
    const { appId, clusterList, data } = appClusterRepositories()
    const formState = reactive({
      Name: '',
    })
    const columns = [
      { dataIndex: 'Name', key: 'Name', title: '集群名',},
      { dataIndex: 'Comment', key: 'Comment', title: '描述'},
      { title: '操作', key: 'action', slots: { customRender: 'action', }, align: 'center', width: '200px'}
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
    const showCreateDialog = () => {
      console.log('===')
    }
    const showEditDialog = (cluster: Cluster) => {
      console.log(cluster)
    }
    const debounceName = (value: string) => {
      data.value = clusterList.value.filter((cluster: Cluster) => cluster.Name?.indexOf(value) !== -1)
    }
    watch(() => formState.Name, _.debounce(debounceName, 300))

    return {
      data,
      formState,
      columns,
      pagination,
      paginationChange,
      showCreateDialog,
      showEditDialog,
    }
  }
};
</script>

<style scoped lang="less">
@import "../../components/index.less";
</style>
