<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <CommonLayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <div class="select-menu-contain">{{ appInfo?.Name }}</div>
        <a-menu
          class="menu-side"
          mode="inline"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeysMenu"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template v-for="item in bar" :key="item.path">
            <template v-if="!item.children">
              <a-menu-item :key="item.path">
                <span>
                  <icon-font :type="item.icon" />
                  <router-link :to="{path: '/' + bizId + '/app/' + appId + '/' + item.path, }">{{ item.name }}</router-link>
                </span>
              </a-menu-item>
            </template>
            <template v-else>
              <a-sub-menu :key="item.path">
                <template #title>
                  <icon-font :type="item.icon" />
                  <span>{{ item.name }}</span>
                </template>
                <a-menu-item v-for="t in item.children" :key="t.path">
                  <span>
                  <icon-font :type="t.icon" />
                  <router-link :to="{path: '/' + bizId + '/app/' + appId + '/' + t.path, }" >{{ t.name }}</router-link>
                  </span>
                </a-menu-item>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="common-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import CommonLayoutHeader from "@/components/CommonLayoutHeader.vue";
import { useRoute, } from "vue-router";
import { BarItem } from "@/utils/response";
import { reactive, ref, toRefs, watch } from "vue";
import appInfoRepositories from "@/composable/appInfoRepositories";
import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2663750_agiifc2fo96.js'
})

export default {
  name: "AppLayout",
  components: { CommonLayoutHeader, IconFont },
  setup() {
    const route = useRoute()
    const url = route.path.split('/')
    const { appInfo, appId, bizId } = appInfoRepositories()
    const state = reactive({
      openKeys: ['setup'],
      selectedKeysMenu: [url[4]],
    })
    const bar = ref<BarItem[]>([
      {id: 1, icon: 'icon-app', path: 'index', name: '应用总览'},
      {id: 2, icon: 'icon-member', path: 'members', name: '应用成员'},
      {id: 3, icon: 'icon-app-set', path: 'setup', name: '应用设置',
        children: [
          {id: 4, icon: 'icon-info', path: 'set-information', name: '基本信息'},
          {id: 5, icon: 'icon-cluster', path: 'set-cluster', name: '集群设置'},
        ],
      },
      {id: 6, icon: 'icon-host', path: 'host-details', name: '机器详情'},
    ])

    watch(() => route.path, value => {
      const url = value.split('/')
      state.selectedKeysMenu = [url[4]]
    })

    return {
      bar,
      appId,
      bizId,
      appInfo,
      ...toRefs(state),
    }
  }
};
</script>

<style scoped lang="less">
@import "index";
.common-content {
  padding: 0 20px;
}
</style>
