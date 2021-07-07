<template>
<div>
  <a-form :model="formState" layout="inline">
    <a-form-item label="名字" >
      <a-input v-model:value="formState.Name" placeholder="名字" />
    </a-form-item>
    <a-form-item label="中文名">
      <a-input v-model:value="formState.DisplayName" placeholder="中文名" />
    </a-form-item>
  </a-form>
  <a-form :model="formState" style="margin: 20px 0">
    <a-form-item label="描述" >
      <a-textarea v-model:value="formState.Comment" placeholder="描述" :rows="5" />
    </a-form-item>
  </a-form>
  <a-button @click="updateBiz" type="primary" style="margin-bottom: 20px">修改</a-button>
  <a-collapse :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="高级设置" :style="customStyle">
      <div class="set-information">
        <a-form :model="transferForm" layout="inline">
          <a-form-item label="转交给" >
            <a-select
              v-model:value="transferForm.OwnerID"
              show-search
              style="min-width: 200px;"
              placeholder="Select a User"
            >
              <a-select-option v-for="option in bizMembers" :key="option.ID" :value="option.UserID">{{ option.Username }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-button @click="onSubmitTransfer">确定</a-button>
      </div>
    </a-collapse-panel>
  </a-collapse>
</div>
</template>

<script lang="ts">
import bizInfoRepositories from "@/composable/bizInfoRepositories";
import { reactive, watch } from "vue";
import bizMemberRepositories from "@/composable/bizMemberRepositories";
import { CaretRightOutlined } from '@ant-design/icons-vue'
import devopsRepository from "@/api/devopsRepository";
import { message } from "ant-design-vue";

export default {
  name: "BizSetInformation",
  components: { CaretRightOutlined },
  setup() {
    const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    const { bizInfo, bizId } = bizInfoRepositories()
    const { bizMembers } = bizMemberRepositories()
    const formState = reactive({
      Name: bizInfo.value?.Name,
      DisplayName: bizInfo.value?.DisplayName,
      Comment: bizInfo.value?.Comment,
    })
    const transferForm = reactive({
      OwnerID: bizInfo.value?.Owner?.ID,
    })

    const updateBiz = async () => {
      try {
        const value = {...formState}
        await devopsRepository.updateBizInfo(bizId.value, value)
        message.success('修改成功')
      } catch (e) {
        console.error(e)
      }
    }
    const onSubmitTransfer = async () => {
      try {
        const value = {...transferForm}
        await devopsRepository.transferOwnerByBizId(bizId.value, value)
        message.success('转交成功')
      } catch (e) {
        console.error(e)
      }
    }

    watch(bizInfo, (value) => {
      formState.Name = value?.Name
      formState.DisplayName = value?.DisplayName
      formState.Comment = value?.Comment
      transferForm.OwnerID = value?.Owner?.ID
    })

    return {
      customStyle,
      formState,
      transferForm,
      bizMembers,
      updateBiz,
      onSubmitTransfer,
    }
  }
};
</script>

<style scoped lang="less">
.set-information {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>
