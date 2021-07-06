<template>
<div>
  <div class="biz-members-content-header">
    <div>
      <a-button @click="showCreateDialog">添加</a-button>
    </div>
    <a-form :model="formState" layout="inline" class="biz-app">
      <a-form-item label="用户名" >
        <a-input v-model:value="formState.Username" placeholder="用户名" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-model:value="formState.Role"
          show-search
          placeholder="Select a role"
          style="width: 200px"
        >
          <a-select-option value="maintainer">maintainer</a-select-option>
          <a-select-option value="developer">developer</a-select-option>
          <a-select-option value="reporter">reporter</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
  <a-table :columns="columns" :data-source="members" :row-key="(record) => record.ID"
           @change="paginationChange"
           :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }" >
      <div >
       <span style="margin-right: 20px">
         <router-link :to="{path: '/app/' + record.ID + '/members'}">
<!--           <TeamOutlined />-->
         </router-link>
       </span>
        <span>
         <router-link :to="{path: '/app/' + record.ID + '/index'}">
<!--           <EditOutlined />-->
         </router-link>
       </span>
      </div>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { Members } from "@/utils/response";

export default {
  name: "CommonMembers",
  props: {
    members: Array
  },
  setup() {
    const formState = reactive({
      Username: '',
      Role: undefined,
    })
    const columns = [
      { dataIndex: 'Username', key: 'Username', title: '用户名',},
      { dataIndex: 'Role', key: 'Role', title: '角色'},
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
      console.log(';;;;')
    }

    return {
      pagination,
      columns,
      formState,
      showCreateDialog,
      paginationChange,
    }
  }
};
</script>

<style scoped lang="less">
.biz-members-content-header {
  display: flex;
  margin-bottom: 10px;
  button {
    margin-right: 10px;
  }
}
</style>
