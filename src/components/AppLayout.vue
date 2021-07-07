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
<!--                  <icon-font :type="item.icon" />-->
                  <router-link :to="{path: '/app/' + appId + '/' + item.path, }">{{ item.name }}</router-link>
                </span>
              </a-menu-item>
            </template>
            <template v-else>
              <a-sub-menu :key="item.path">
                <template #title>
                  <!--                  <icon-font :type="item.icon" />-->
                  <span>{{ item.name }}</span>
                </template>
                <a-menu-item v-for="t in item.children" :key="t.path">
                  <span>
<!--                  <icon-font :type="t.icon" />-->
                  <router-link :to="{path: '/app/' + appId + '/' + t.path, }" >{{ t.name }}</router-link>
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
import { reactive, ref, toRefs } from "vue";
import appInfoRepositories from "@/composable/appInfoRepositories";
export default {
  name: "AppLayout",
  components: { CommonLayoutHeader },
  setup() {
    const route = useRoute()
    const url = route.path.split('/')
    const { appInfo, appId } = appInfoRepositories()

    const state = reactive({
      openKeys: ['setup'],
      selectedKeysMenu: [url[3]],
    })
    const bar = ref<BarItem[]>([
      {id: 1, icon: '', path: 'index', name: '应用总览'},
      {id: 2, icon: '', path: 'members', name: '应用成员'},
      {id: 3, icon: '', path: 'setup', name: '应用设置',
        children: [
          {id: 4, icon: '', path: 'set-information', name: '基本信息'},
          {id: 5, icon: '', path: 'set-cluster', name: '集群设置'},
        ],
      },
      {id: 6, icon: '', path: 'host-details', name: '机器详情'},
    ])

    return {
      bar,
      appId,
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
