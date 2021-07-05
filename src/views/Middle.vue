<template>
  <div></div>
</template>

<script lang="ts">

import devopsRepository from "@/api/devopsRepository";
import router from "@/router";

export default {
  name: "Middle",
  components: {
  },
  setup() {
    const token = localStorage.getItem('token')
    const login = async () => {
      const data = await devopsRepository.login()
      if (data?.token) {
        localStorage.setItem('token', data.token)
        router.push('/biz/index').then()
      }
    }

    if (!token) {
      login()
    } else {
      router.push('/biz/index')
    }

    return {

    }
  }
}
</script>
<style scoped lang="less">

</style>
