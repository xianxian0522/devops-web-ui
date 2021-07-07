import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";
import { AppResponse } from "@/utils/response";

export default function appInfoRepositories() {
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const appInfo = ref<AppResponse>()

  const getAppInfo = async () => {
    try {
      appInfo.value = await devopsRepository.queryAppInfoById(appId.value)
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getAppInfo)

  return {
    appId,
    appInfo,
  }
}
