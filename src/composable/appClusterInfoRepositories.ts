import { onMounted, ref } from "vue";
import { Cluster, LogicIdcEnv } from "@/utils/response";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";

export default function appClusterInfoRepositories() {
  const clusterInfo = ref<Cluster>()
  const logicIdcEnv = ref<LogicIdcEnv[]>([])
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const clusterId = ref(parseInt(route.params.clusterId as string, 10))
  const getClusterInfo = async () => {
    try {
      clusterInfo.value = await devopsRepository.queryClusterInfoByCluId(clusterId.value)
    } catch (e) {
      console.error(e)
    }
  }

  const getLogicIdcEnv = async () => {
    try {
      logicIdcEnv.value = await devopsRepository.queryLogicIdcEnv()
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(() => {
    getClusterInfo().then()
    getLogicIdcEnv().then()
  })

  return {
    clusterId,
    clusterInfo,
    appId,
    getClusterInfo,
    getLogicIdcEnv,
  }
}
