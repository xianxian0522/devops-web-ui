import { onMounted, ref } from "vue";
import { Cluster, LogicIdcEnv, NodeTree, ReplicaSet } from "@/utils/response";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";
import rsRepositories from "@/composable/rsRepositories";

export default function appClusterInfoRepositories() {
  const clusterInfo = ref<Cluster>()
  const logicIdcEnv = ref<LogicIdcEnv[]>([])
  const nodesTree = ref<NodeTree[]>([])

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
      const logic = logicIdcEnv.value.map((r: LogicIdcEnv) => ({logicIdcID: r.LogicIdc.ID, name: r.LogicIdc.Name}))
      const result: any = []
      const obj: any = {}
      logic.forEach(item => {
        if (!obj[item.logicIdcID]) {
          result.push(item)
          obj[item.logicIdcID] = true;
        }
      })
      const rsList = await devopsRepository.queryRsByCluId(clusterId.value)
      const rsIds = rsList.map(r => r.LogicIdcEnv?.ID)
      result.forEach((l: any, index: number) => {
        nodesTree.value.push({
          title: l.name,
          key: l.logicIdcID,
          expanded: true,
          children: [] as NodeTree[],
        })
        logicIdcEnv.value.forEach((logic: LogicIdcEnv) => {
          if (logic.LogicIdc.ID === l.logicIdcID) {
            if (rsIds.includes(logic.ID)) {
              (nodesTree.value[index].children as NodeTree[]).push({
                id: logic.ID,
                title: logic.Env?.Name,
                key: logic.ID + '-' + l.logicIdcID + '-' + logic.Env?.ID,
                checked: true,
                selected: true
              })
            } else {
              (nodesTree.value[index].children as NodeTree[]).push({
                id: logic.ID,
                title: logic.Env?.Name,
                key: logic.ID + '-' + l.logicIdcID + '-' + logic.Env?.ID,
                checked: true,
                selected: false
              })
            }
          }
        })
      })
      console.log(nodesTree);
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
    nodesTree,
    getClusterInfo,
    getLogicIdcEnv,
  }
}
