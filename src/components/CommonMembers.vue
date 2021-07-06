<template>
<div>
  <div class="biz-members-content-header">
    <div>
      <a-button @click="showCreateDialog">添加</a-button>
    </div>
    <a-form :model="formState" layout="inline">
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
        <a-popconfirm
          title="确定要删除吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirmDelete"
        >
          <a-button type="link"><DeleteOutlined /></a-button>
        </a-popconfirm>
      </div>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" :title="modelTitle" @ok="handleSubmit">
    <a-form :model="modalForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="用户名" >
        <a-input v-model:value="modalForm.Username" placeholder="用户名" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-model:value="modalForm.Role"
          show-search
          placeholder="Select a role"
        >
          <a-select-option value="maintainer">maintainer</a-select-option>
          <a-select-option value="developer">developer</a-select-option>
          <a-select-option value="reporter">reporter</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs, UnwrapRef, watch } from "vue";
import { TableState } from "ant-design-vue/es/table/interface";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons-vue'
import { Members, UserResponse } from "@/utils/response";
import * as _ from "lodash";
import devopsRepository from "@/api/devopsRepository";

export interface FormModal {
  Username: string | undefined;
  Role: string | undefined;
}

export default {
  name: "CommonMembers",
  props: {
    members: Array
  },
  components: { EditOutlined, DeleteOutlined },
  setup(props: any) {
    const formState = reactive({
      Username: '',
      Role: '',
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
    const data = ref<Members[]>(props.members)

    const modalState = reactive({
      visible: false,
      mode: '',
      modelTitle: '',
      userData: [] as UserResponse[],
    })
    const modalForm: UnwrapRef<FormModal> = reactive({
      Username: '',
      Role: '',
    })

    const handleSubmit = () => {
      console.log(';;;;submit', modalForm)
    }
    const getUser = async () => {
      modalState.userData = await devopsRepository.queryAllUser()
    }
    const showCreateDialog = () => {
      modalState.visible = true
      modalState.mode = 'create'
      modalState.modelTitle = '新增成员'
      modalForm.Role = ''
      modalForm.Username = ''
      getUser()
    }
    const showEditDialog = (col: Members) => {
      modalState.visible = true
      modalState.mode = 'edit'
      modalState.modelTitle = '修改成员'
      modalForm.Username = col.Username
      modalForm.Role = col.Role
      getUser()
    }
    const confirmDelete = () => {
      console.log('[[[[')
    }
    const paginationChange = (page: TableState['pagination']) => {
      pagination.current = page?.current as number
      pagination.pageSize = page?.pageSize as number
    }
    const debounceUsername = (value: string) => {
      if (formState.Role) {
        data.value = props.members.filter((m: Members) => {
          return (m.Username?.indexOf(value) !== -1 && m.Role?.indexOf(formState.Role) !== -1)
        })
      } else {
        data.value = props.members.filter((m: Members) => m.Username?.indexOf(value) !== -1)
      }
    }
    const debounceRole = (value: string) => {
      if (formState.Username) {
        data.value = props.members.filter((m: Members) => {
          return (m.Username?.indexOf(value) !== -1 && m.Role?.indexOf(formState.Role) !== -1)
        })
      } else {
        data.value = props.members.filter((m: Members) => m.Role?.indexOf(value) !== -1)
      }
    }
    watch(() => formState.Username, _.debounce(debounceUsername, 300))
    watch(() => formState.Role, _.debounce(debounceRole, 300))

    watch(() => props.members, () => {
      data.value = props.members
    })

    return {
      ...toRefs(modalState),
      modalForm,
      data,
      pagination,
      columns,
      formState,
      showCreateDialog,
      showEditDialog,
      paginationChange,
      confirmDelete,
      handleSubmit,
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
