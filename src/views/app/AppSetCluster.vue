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
        <a-button type="link" >
          <router-link :to="{path: 'set-cluster/edit/' + record.ID}"><EditOutlined /></router-link>
        </a-button>
        <a-button type="link">实例配置</a-button>
      </div>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" title="添加集群" @ok="addCluster">
    <a-form :model="modalForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="集群名" >
        <a-input v-model:value="modalForm.Name" placeholder="集群名" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="modalForm.Comment" placeholder="描述" />
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>

<script lang="ts">
import { reactive, toRefs, UnwrapRef, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { EditOutlined } from '@ant-design/icons-vue'
import appClusterRepositories from "@/composable/appClusterRepositories";
import { Cluster } from "@/utils/response";
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import * as _ from "lodash";
import devopsRepository from "@/api/devopsRepository";
import { message } from "ant-design-vue";

export default {
  name: "AppSetCluster",
  components: { EditOutlined, CommonBreadcrumb },
  setup() {
    const { appId, clusterList, data, getCluster } = appClusterRepositories()
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
    const modalState = reactive({
      visible: false,
    })
    const modalForm = reactive({
      Name: '',
      Comment: '',
    })

    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }
    const showCreateDialog = () => {
      modalState.visible = true
      modalForm.Name = ''
      modalForm.Comment = ''
    }
    const addCluster = async () => {
      const value = {...modalForm}
      try {
        await devopsRepository.addAppCluster(appId.value, value)
        modalState.visible = false
        message.success('添加成功')
        await getCluster()
      } catch (e) {
        console.error(e)
      }
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
      modalForm,
      ...toRefs(modalState),
      paginationChange,
      showCreateDialog,
      addCluster,
    }
  }
};
</script>

<style scoped lang="less">
@import "../../components/index.less";
</style>
