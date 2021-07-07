<template>
<div>
  <CommonBreadcrumb>
    <template v-slot:first>app</template>
    <template v-slot:second>set-info</template>
  </CommonBreadcrumb>
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
  <a-button @click="updateApp" type="primary" style="margin-bottom: 20px">修改</a-button>
  <a-collapse :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="高级设置" :style="customStyle">
      <div class="set-information">
<!--        <a-form :model="transferForm" layout="inline">-->
<!--          <a-form-item label="转交给" >-->
<!--            <a-select-->
<!--              v-model:value="transferForm.OwnerID"-->
<!--              show-search-->
<!--              style="min-width: 200px;"-->
<!--              placeholder="Select a User"-->
<!--            >-->
<!--              <a-select-option v-for="option in bizMembers" :key="option.ID" :value="option.UserID">{{ option.Username }}</a-select-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->
<!--        </a-form>-->
<!--        <a-button @click="onSubmitTransfer">确定</a-button>-->
      </div>
    </a-collapse-panel>
  </a-collapse>
</div>
</template>

<script lang="ts">
import CommonBreadcrumb from "@/components/CommonBreadcrumb.vue";
import { reactive, watch } from "vue";
import appInfoRepositories from "@/composable/appInfoRepositories";
import { CaretRightOutlined } from '@ant-design/icons-vue';

export default {
  name: "AppSetInformation",
  components: {
    CommonBreadcrumb,
    CaretRightOutlined,
  },
  setup() {
    const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    const { appInfo } = appInfoRepositories()
    const formState = reactive({
      Name: appInfo.value?.Name,
      DisplayName: appInfo.value?.DisplayName,
      Comment: appInfo.value?.Comment,
    })

    const updateApp = async () => {
      try {
        console.log('[[')
      } catch (e) {
        console.error(e)
      }
    }

    watch(appInfo, (value) => {
      formState.Name = value?.Name
      formState.DisplayName = value?.DisplayName
      formState.Comment = value?.Comment
    })

    return {
      customStyle,
      formState,
      updateApp,
    }
  }
};
</script>

<style scoped lang="less">

</style>
