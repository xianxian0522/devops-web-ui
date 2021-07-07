<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <CommonLayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <div class="select-menu-contain">
          <a-select
            v-model:value="bizId"
            show-search
            placeholder="Select a biz"
            :filter-option="filterOptionBiz"
            style="width: 100%"
          >
            <a-select-option v-for="option in bizList" :key="option.ID" :value="option.ID" :title="option.Name">{{ option.Name }}</a-select-option>
          </a-select>
        </div>
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
                  <router-link :to="{path: '/biz/' + item.path, query: { bizId: bizId }}">{{ item.name }}</router-link>
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
                  <router-link :to="{path: '/biz/' + t.path,  query: { bizId: bizId }}" >{{ t.name }}</router-link>
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
import { useRoute, useRouter } from "vue-router";
import bizRepositories from "@/composable/bizRepositories";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { BarItem } from "@/utils/response";

export default {
  name: "BizLayout",
  components: {
    CommonLayoutHeader,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const url = route.path.split('/')

    const { bizId, bizList } = bizRepositories()

    const state = reactive({
      openKeys: ['setup'],
      selectedKeysMenu: [url[2]],
    })
    const bar = ref<BarItem[]>([
      {id: 1, icon: '', path: 'index', name: '业务总览'},
      {id: 2, icon: '', path: 'members', name: '业务成员'},
      {id: 3, icon: '', path: 'setup', name: '设置',
        children: [
          {id: 4, icon: '', path: 'set-information', name: '基本信息'},
          {id: 5, icon: '', path: 'app-settings', name: '应用设置'},
        ],
      },
      {id: 6, icon: '', path: 'host-details', name: '机器详情'},
    ])

    const filterOptionBiz = (input: string, option: any) => {
      console.log(input, option)
      return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    watch(bizId, value => {
      router.push({
        path: route.path,
        query: { bizId: value }
      })
    })
    onMounted(() => {
      const id = (route.query?.bizId || '0') as string
      localStorage.setItem('bizId', id)
    })

    return {
      bar,
      ...toRefs(state),
      bizId,
      bizList,
      filterOptionBiz,
    }
  }
};
</script>

<style scoped lang="less">
@import "index.less";
</style>
