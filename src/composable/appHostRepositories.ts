import { onMounted, ref } from "vue";
import { Hosts } from "@/utils/response";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";

export default function appHostRepositories() {
  const hostList = ref<Hosts[]>([])
  // const data = ref<Hosts[]>([])
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const getHost = async () => {
    try {
      hostList.value = await devopsRepository.queryHostsByAppId(appId.value)
      // data.value = hostList.value
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getHost)

  return {
    // data,
    hostList,
    appId,
    getHost,
  }
}
