<template>
<div>
  <CommonBreadcrumb :three="true">
    <template v-slot:first>app</template>
    <template v-slot:second>cluster</template>
    <template v-slot:three>instance</template>
  </CommonBreadcrumb>
  <CommonTree :nodes-tree="nodesTree" @rsInstanceSelect="instanceSelect" />

  <div class="biz-members-content-header cluster-instance">
    <div>
      <a-button @click="showCreateDialog">添加</a-button>
    </div>
    <a-form :model="formState" layout="inline">
      <a-form-item label="名字" style="margin-right: 0">
        <a-input v-model:value="formState.Name" placeholder="名字" />
      </a-form-item>
    </a-form>
  </div>
  <a-table :columns="columns" :data-source="data" :row-key="(record) => record.ID"
           @change="paginationChange" :scroll="{ x: 2000 }"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }" >
      <div >
        <a-button type="link" >
          <EditOutlined />{{ record.ID }}
        </a-button>
      </div>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import CommonTree from "@/components/CommonTree.vue";
import rsRepositories from "@/composable/rsRepositories";
import { Instance, NodeTree } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { reactive, ref } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { EditOutlined } from '@ant-design/icons-vue'

export default {
  name: "AppClusterInstance",
  components: {
    CommonBreadcrumb,
    CommonTree,
    EditOutlined,
  },
  setup() {
    const { nodesTree } = rsRepositories()
    const columns = [
      { dataIndex: 'Name', key: 'Name', title: '实例名', fixed: 'left', width: 180},
      { dataIndex: 'State', key: 'State', title: '状态'},
      { dataIndex: 'Comment', key: 'Comment', title: '描述',},
      { dataIndex: 'User', key: 'User', title: '用户'},
      { dataIndex: 'DataDir', key: 'DataDir', title: '数据目录',},
      { dataIndex: 'LogDir', key: 'LogDir', title: '日志目录'},
      { dataIndex: 'MetricEndpoint', key: 'MetricEndpoint', title: '监控采集地址',},
      { dataIndex: 'WorkDir', key: 'WorkDir', title: '工作目录'},
      { title: '操作', key: 'action', slots: { customRender: 'action', },
        align: 'center', width: 100, fixed: 'right'}
    ]
    const pagination = reactive({
      showSizeChanger: true,
      current: 1,
      pageSize: 10,
    })
    const formState = reactive({
      Name: '',
    })
    const data = ref<Instance[]>([])
    const instanceList = ref<Instance[]>([])

    const instanceSelect = (rsId: number) => {
      getRsInstance(rsId)
      const arr = nodesTree.value.map(k => k.children)
      const data = flattenDeep(arr)
      data.forEach((k: NodeTree) => {
        if (k.id !== rsId) {
          k.selected = false
        }
      })
    }
    const flattenDeep = (arr: any) => {
      return arr.reduce((acc: any, val: any) => Array.isArray(val) ?
        acc.concat(flattenDeep(val)) : acc.concat(val), [])
    }
    const getRsInstance = async (rsId: number) => {
      try {
        const data = await devopsRepository.queryRsInstanceByRsId(rsId)
        console.log(rsId, data)
      } catch (e) {
        console.error(e)
      }
    }
    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }
    const showCreateDialog = () => {
      console.log(';;;')
    }

    return {
      nodesTree,
      formState,
      columns,
      pagination,
      data,
      instanceSelect,
      paginationChange,
      showCreateDialog,
    }
  }
};
</script>

<style scoped lang="less">
@import "../../components/index.less";
.cluster-instance {
  justify-content: flex-end;
}
</style>
