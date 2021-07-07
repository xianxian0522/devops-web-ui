import { onMounted, ref } from "vue";
import { Cluster } from "@/utils/response";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";

export default function appClusterRepositories() {
  const clusterList = ref<Cluster[]>([])
  const data = ref<Cluster[]>([])
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const getCluster = async () => {
    try {
      clusterList.value = await devopsRepository.queryClusterByAppId(appId.value)
      data.value = clusterList.value
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getCluster)

  return {
    data,
    clusterList,
    appId,
    getCluster,
  }
}
