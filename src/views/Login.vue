<template>
  <div class="login">
    <div class="login-admin">
      <h2>通过 SSO 登录 DEVOPS</h2>
      <a-button size="large" type="primary" @click="login">登录</a-button>
    </div>
  </div>
</template>

<script lang="ts">

import devopsRepository from "@/api/devopsRepository";
import tokenRepositories from "@/composable/tokenRepositories";

export default {
  name: "Login",
  setup() {
    const login = async () => {
      try {
        const data = await devopsRepository.login()
        if (data?.url) {
          window.location.href = data.url
        }
        if (data?.token) {
          tokenRepositories(data.token)
        }
      } catch (e) {
        console.error(e)
      }
    }

    return {
      login,
    }
  }
}
</script>

<style scoped lang="less">
@import "../components/index";
</style>
