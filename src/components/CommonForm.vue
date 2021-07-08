<template>
<div class="common-content">
  <a-form :model="formState">
    <a-form-item class="common-form">
      <label class="common-form-label">绑定端口信息: <PlusCircleOutlined @click="addInfo" class="common-icon" /></label>
      <div v-for="(bindInfo, index) in formState.BindInfos" :key="'BindInfos' + index">
        <div class="flex common-form-content">
          <MinusCircleOutlined @click="removeInfo(index)" class="delete-icon" />
          <a-form :model="bindInfo" layout="inline">
            <a-form-item label="Ip地址">
              <a-input v-model:value="bindInfo.Ip" placeholder="Ip地址" />
            </a-form-item>
            <a-form-item label="名字">
              <a-input v-model:value="bindInfo.Name" placeholder="名字" />
            </a-form-item>
            <a-form-item label="端口号">
              <a-input-number style="width: 160px;" v-model:value="bindInfo.Port" :min="0" />
            </a-form-item>
            <a-form-item label="协议">
              <a-input v-model:value="bindInfo.Protocol" placeholder="协议" />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-form-item>
    <a-form-item class="common-form">
      <label class="common-form-label">环境变量: <PlusCircleOutlined @click="addEnv" class="common-icon" /></label>
      <div v-for="(env, index) in formState.EnvVars" :key="'env' + index">
        <div class="flex common-form-content">
          <MinusCircleOutlined @click="removeEnv(index)" class="delete-icon" />
          <a-form :model="env" layout="inline">
            <a-form-item label="名字">
              <a-input v-model:value="env.Name" placeholder="名字" />
            </a-form-item>
            <a-form-item label="值">
              <a-input v-model:value="env.Value" placeholder="值" />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-form-item>
  </a-form>
  <a-form :model="formState" layout="inline" >
    <a-form-item label="名字">
      <a-input v-model:value="formState.Name" placeholder="名字" />
    </a-form-item>
    <a-form-item label="启动用户">
      <a-input v-model:value="formState.User" placeholder="启动用户" />
    </a-form-item>
    <a-form-item label="监控采集接口">
      <a-input v-model:value="formState.MetricEndpoint" placeholder="监控采集接口" />
    </a-form-item>
    <a-form-item label="日志目录">
      <a-input v-model:value="formState.LogDir" placeholder="日志目录" />
    </a-form-item>
    <a-form-item label="数据目录">
      <a-input v-model:value="formState.DataDir" placeholder="数据目录" />
    </a-form-item>
    <a-form-item label="工作目录">
      <a-input v-model:value="formState.WorkDir" placeholder="工作目录" />
    </a-form-item>
    <a-form-item label="备注">
      <a-input v-model:value="formState.Comment" placeholder="备注" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select
        v-model:value="formState.State"
        show-search
        style="width: 160px;"
        placeholder="Select a State"
      >
        <a-select-option value="active">active</a-select-option>
        <a-select-option value="inactive">inactive</a-select-option>
        <a-select-option value="maintaining">maintaining</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
  <a-button @click="updateInstance" type="primary" style="margin: 20px 0">修改</a-button>
</div>
</template>

<script lang="ts">
import { onMounted, reactive, UnwrapRef } from "vue";
import { InstanceTemplate } from "@/utils/response";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'

export default {
  name: "CommonForm",
  components: { PlusCircleOutlined, MinusCircleOutlined },
  emits: ['updateInstance'],
  props: {
    instance: Object,
  },
  setup(props: any, content: any) {
    const formState: UnwrapRef<InstanceTemplate> = reactive({
      BindInfos: [
        {
          Ip: '',
          Name: '',
          Port: 0,
          Protocol: '',
        }
      ],
      EnvVars: [
        {
          Name: '',
          Value: '',
        }
      ],
      Comment: '',
      DataDir: '',
      LogDir: '',
      MetricEndpoint: '',
      Name: '',
      State: undefined,
      User: '',
      WorkDir: '',
    })

    const addInfo = () => {
      formState.BindInfos?.push({
        Ip: '',
        Name: '',
        Port: 0,
        Protocol: '',
      })
    }
    const addEnv = () => {
      formState.EnvVars?.push({
        Name: '',
        Value: '',
      })
    }
    const removeInfo = (index: number) => {
      if (formState.BindInfos!.length > 1) {
        formState.BindInfos!.splice(index, 1)
      }
    }
    const removeEnv = (index: number) => {
      if (formState.EnvVars!.length > 1) {
        formState.EnvVars!.splice(index, 1)
      }
    }
    const updateInstance = () => {
      const value = {
        InstanceTemplate: formState
      }
      content.emit('updateInstance', value)
    }
    const getFormState = (value: InstanceTemplate) => {
      if (value.BindInfos && value.BindInfos.length > 0) {
        formState.BindInfos = value.BindInfos
      }
      if (value.EnvVars && value.EnvVars.length > 0) {
        formState.EnvVars = value.EnvVars
      }
      formState.Comment = value?.Comment
      formState.DataDir = value?.DataDir
      formState.LogDir = value?.LogDir
      formState.MetricEndpoint = value?.MetricEndpoint
      formState.Name = value?.Name
      formState.State = value?.State
      formState.User = value?.User
      formState.WorkDir = value?.WorkDir
    }

    onMounted(() => {
      getFormState(props.instance)
    })

    return {
      formState,
      addInfo,
      addEnv,
      removeInfo,
      removeEnv,
      updateInstance,
    }
  }
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.common-form-content {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 10px;
  border-radius: 4px;
  position: relative;
  flex: 1;
  margin-left: 120px;
  margin-bottom: 10px;
  max-width: fit-content;
  .delete-icon {
    cursor: pointer;
    position: absolute;
    left: 8px;
    top: 8px;
  }
}
.common-content {
  .ant-form-inline .ant-form-item {
    margin-top: 10px;
    margin-bottom: 0;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
}
.common-form-label {
  min-width: 118px;
}
.common-icon {
  margin-right: 10px;
  cursor: pointer;
}
//.common-form /deep/ .ant-form-item-control-input-content {
//  display: flex;
//}
</style>
