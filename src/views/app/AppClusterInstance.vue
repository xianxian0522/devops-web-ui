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
      <a-button :disabled="!rId" @click="showCreateDialog">添加</a-button>
    </div>
    <a-form :model="formState" layout="inline">
      <a-form-item label="名字" style="margin-right: 0">
        <a-input v-model:value="formState.Name" placeholder="名字" />
      </a-form-item>
    </a-form>
  </div>
  <a-table :columns="columns" :data-source="instanceListFilter" :row-key="(record) => record.ID"
           @change="paginationChange" :scroll="{ x: 2000 }"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }" >
      <div >
        <a-button type="link" @click="showEditDialog(record)">
          <EditOutlined />
        </a-button>
      </div>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" :title="modalTitle" :width="'80vw'" :footer="null">
    <CommonForm :instance="instanceInfo" :is-host="isHost" @updateInstance="updateInstance"  />
  </a-modal>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import CommonTree from "@/components/CommonTree.vue";
import CommonForm from "@/components/CommonForm.vue";
import rsRepositories from "@/composable/rsRepositories";
import { Instance, NodeTree, UpdateAppInfo } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { reactive, ref, toRefs, UnwrapRef, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { EditOutlined } from '@ant-design/icons-vue'
import { message } from "ant-design-vue";
import * as _ from "lodash";

export interface ModalInstance {
  visible: boolean;
  modalTitle: string;
  mode: string;
  instanceInfo: Instance;
  isHost: boolean;
}

export default {
  name: "AppClusterInstance",
  components: {
    CommonBreadcrumb,
    CommonTree,
    EditOutlined,
    CommonForm,
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
    const instanceListFilter = ref<Instance[]>([])
    const instanceList = ref<Instance[]>([])
    const rId = ref(0)
    const modalState: UnwrapRef<ModalInstance> = reactive({
      visible: false,
      modalTitle: '',
      mode: '',
      instanceInfo: {ID: 0},
      isHost: false,
    })

    const instanceSelect = (rsId: number) => {
      rId.value = 0
      const arr = nodesTree.value.map(k => k.children)
      const data = flattenDeep(arr)
      data.forEach((k: NodeTree) => {
        if (k.id !== rsId) {
          k.selected = false
        } else {
          instanceListFilter.value = []
          if (!k.selected) {
            rId.value = rsId
            getRsInstance()
          }
        }
      })
    }
    const flattenDeep = (arr: any) => {
      return arr.reduce((acc: any, val: any) => Array.isArray(val) ?
        acc.concat(flattenDeep(val)) : acc.concat(val), [])
    }
    const getRsInstance = async () => {
      try {
        instanceList.value = await devopsRepository.queryRsInstanceByRsId(rId.value)
        instanceListFilter.value = instanceList.value
      } catch (e) {
        console.error(e)
      }
    }
    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }
    const showCreateDialog = () => {
      modalState.visible = true
      modalState.modalTitle = '新增实例'
      modalState.mode = 'created'
      modalState.instanceInfo = {ID: 0}
      modalState.isHost = true
    }
    const showEditDialog = (col: Instance) => {
      modalState.visible = true
      modalState.modalTitle = '修改实例'
      modalState.mode = 'edit'
      modalState.instanceInfo = col
      modalState.isHost = false
    }
    const updateInstance = async (value: UpdateAppInfo) => {
      try {
        const params = value.InstanceTemplate
        const insId = modalState.instanceInfo.ID
        modalState.mode === 'edit' ? await devopsRepository.updateInstanceByInsId(insId, params)
          : await devopsRepository.addInstanceByRsId(rId.value, params)
        modalState.visible = false
        message.success(modalState.mode === 'edit' ? '修改成功' : '新增成功')
        await getRsInstance()
      } catch (e) {
        console.error(e)
      }
    }
    const debounceName = (value: string) => {
      instanceListFilter.value = instanceList.value.filter((instance: Instance) => instance.Name?.indexOf(value) !== -1)
    }
    watch(() => formState.Name, _.debounce(debounceName, 300))

    return {
      nodesTree,
      formState,
      columns,
      pagination,
      instanceListFilter,
      rId,
      ...toRefs(modalState),
      instanceSelect,
      paginationChange,
      showCreateDialog,
      showEditDialog,
      updateInstance,
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
