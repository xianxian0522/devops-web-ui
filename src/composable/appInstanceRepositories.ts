import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import devopsRepository from "@/api/devopsRepository";
import { Instance } from "@/utils/response";

export default function appInstanceRepositories() {
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const hostId = ref(parseInt(route.params.hostId as string, 10))
  const instanceList = ref<Instance[]>([])
  const data = ref<Instance[]>([])

  const getInstance = async () => {
    try {
      instanceList.value = await devopsRepository.queryAppHostInstance(appId.value, hostId.value)
      data.value = instanceList.value
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getInstance)

  return {
    appId,
    hostId,
    instanceList,
    data,
  }
}
