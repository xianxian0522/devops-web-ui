<template>
<div>
  <a-form :model="formState" layout="inline" class="biz-app">
    <a-form-item label="名字" style="margin-right: 0">
      <a-input v-model:value="formState.name" placeholder="请输入名字" />
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data-source="appListFilter" :row-key="(record) => record.ID"
           @change="paginationChange"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }" >
     <div style="display: flex">
        <span>
          <a>Invite 一 {{ record.Name }}</a>
        </span>
     </div>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs, UnwrapRef, watch } from "vue";
import { AppResponse } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { useRoute } from "vue-router";
import { TableState } from "ant-design-vue/es/table/interface";

export interface AppInfo {
  appList: AppResponse[];
  appListFilter: AppResponse[];
}

export default {
  name: "BizSetApp",
  props: {
    setting: {
      type: Boolean,
      default: true,
    }
  },
  setup(props: any) {
    const route = useRoute()
    const bizId = ref(parseInt(route.query.bizId as string, 10))
    const state: UnwrapRef<AppInfo> = reactive({
      appList: [],
      appListFilter: [],
    })
    const columnsBase = [
      { dataIndex: 'Name', key: 'Name', title: '名字',},
      { dataIndex: 'DisplayName', key: 'DisplayName', title: '显示名',},
      { dataIndex: 'Level', key: 'Level', title: '级别'},
    ]
    const columns = props.setting ? [...columnsBase,
        { title: '操作', key: 'action', slots: { customRender: 'action', },
          align: 'center', width: '200px'},] : [...columnsBase]

    const formState = reactive({
      name: '',
    })
    const pagination = reactive({
      showSizeChanger: true,
      current: 1,
      pageSize: 10,
    })

    const getApp = async () => {
      try {
        if (bizId.value) {
          const data = await devopsRepository.queryAppByBizId(bizId.value)
          state.appList = data
          state.appListFilter = data
        }
      } catch (e) {
        console.error(e)
      }
    }
    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }

    onMounted(() => {
      getApp()
    })
    watch(() => route.query, (value) => {
      const id = parseInt(value.bizId as string, 10)
      bizId.value = id
      getApp()
    })

    return {
      formState,
      columns,
      pagination,
      paginationChange,
      ...toRefs(state),
    }
  }
};
</script>

<style scoped lang="less">
.biz-app {
  margin-bottom: 10px;
  justify-content: flex-end;
}
</style>
