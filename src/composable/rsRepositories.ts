import { ref } from "vue";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";
import { ReplicaSet } from "@/utils/response";

export default function rsRepositories() {
  const rsList = ref<ReplicaSet[]>()
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const clusterId = ref(parseInt(route.params.clusterId as string, 10))

  const getRs = async () => {
    try {
      rsList.value = await devopsRepository.queryRsByCluId(clusterId.value)
    } catch (e) {
      console.error(e)
    }
  }


  return {
    rsList,
    clusterId,
    appId,
    getRs,
  }
}
