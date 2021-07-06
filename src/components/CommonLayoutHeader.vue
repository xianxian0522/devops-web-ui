<template>
  <div class="logo" >
    <img src="http://www.sumscope.com/favicon.ico" alt="">
    DEPLOYER
  </div>
  <div class="layout-header-menu">
    <a-menu
      theme="dark"
      mode="horizontal"
      v-model:selectedKeys="selectedKey"
      :style="{ lineHeight: '58px' }"
    >
      <a-menu-item v-for="bar in menuBar" :key="bar.route">
        <a :href="bar.path">{{ bar.name }}</a>
      </a-menu-item>
    </a-menu>
    <section>
      <a-avatar class="user-avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ username }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="logout()">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted } from "vue";
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import { BarItem } from "@/utils/response";
import jwtDecode from "jwt-decode";
import devopsRepository from "@/api/devopsRepository";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CommonLayoutHeader",
  components: {
    UserOutlined, DownOutlined,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      selectedKey: ['/biz/index'],
      username: '用户名',
    })
    const menuBar = ref<BarItem[]>([])
    const logout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    const getBar = async () => {
      try {
        menuBar.value = await devopsRepository.queryBar()
      } catch (e) {
        console.error(e)
      }
    }

    onMounted(() => {
      getBar()

      const token = localStorage.getItem('token')
      if (token) {
        const userInfo = jwtDecode<{[key:string]: string}>(token)
        state.username = userInfo?.name || userInfo?.username
      }
    })

    return {
      menuBar,
      ...toRefs(state),
      logout,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.logo {
  min-width: 130px;
  height: 58px;
  float: left;
  color: #fff;
  margin-right: 30px;
  text-align: left;
  font-weight: 500;
  line-height: 58px;
  img {
    width: 45px;
  }
}
.layout-header-menu {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  ul, section {
    white-space: nowrap;
  }
  .user-avatar {
    margin-right: 4px;
  }
}
.layout-header-menu /deep/ .ant-menu-dark .ant-menu-item:hover {
  background-color: #1890ff;
}
</style>
