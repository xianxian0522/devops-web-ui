<template>
<div>
  <a-form :model="formState" >
    <a-form-item class="common-form">
      <label>绑定端口信息: <PlusCircleOutlined class="common-icon" /></label>
      <div v-for="(bindInfo, index) in formState.BindInfos" :key="JSON.stringify(bindInfo) + index">
        <div class="flex common-form-content">
          <MinusCircleOutlined class="delete-icon" />
          <a-form :model="bindInfo" layout="inline">
            <a-form-item label="Ip地址">
              <a-input v-model:value="bindInfo.Ip" placeholder="Ip地址" />
            </a-form-item>
            <a-form-item label="名字">
              <a-input v-model:value="bindInfo.Name" placeholder="名字" />
            </a-form-item>
            <a-form-item label="端口号">
              <a-input v-model:value="bindInfo.Port" placeholder="端口号" />
            </a-form-item>
            <a-form-item label="协议">
              <a-input v-model:value="bindInfo.Protocol" placeholder="协议" />
            </a-form-item>
          </a-form>
<!--          <a-form :model="bindInfo" layout="inline">-->

<!--          </a-form>-->
        </div>
      </div>
    </a-form-item>
  </a-form>
</div>
</template>

<script lang="ts">
import { reactive, UnwrapRef } from "vue";
import { InstanceTemplate } from "@/utils/response";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'

export default {
  name: "CommonForm",
  components: { PlusCircleOutlined, MinusCircleOutlined },
  setup() {
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
      State: '',
      User: '',
      WorkDir: '',
    })

    return {
      formState
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
  .delete-icon {
    position: absolute;
    left: 8px;
    top: 8px;
  }
  form {
    margin-top: 10px;
  }
}
.common-icon {
  margin-right: 10px;
}
.common-form /deep/ .ant-form-item-control-input-content {
  display: flex;
}
</style>
