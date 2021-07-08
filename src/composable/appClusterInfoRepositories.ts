import { onMounted, ref } from "vue";
import { Cluster, LogicIdcEnv, NodeTree, ReplicaSet } from "@/utils/response";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";

export default function appClusterInfoRepositories() {
  const clusterInfo = ref<Cluster>()
  const logicIdcEnv = ref<LogicIdcEnv[]>([])
  const rsList = ref<ReplicaSet[]>()
  const rsIds = ref<(number | undefined)[]>([])
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

  const getRs = async () => {
    try {
      rsList.value = await devopsRepository.queryRsByCluId(clusterId.value)
      rsIds.value = rsList.value?.map(r => r.LogicIdcEnv?.ID)
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
      await getRs()
      const nodesTree: NodeTree[] = []
      result.forEach((l: any, index: number) => {
        nodesTree.push({
          title: l.name,
          key: l.logicIdcID,
          expanded: true,
          children: [] as NodeTree[],
        })
        logicIdcEnv.value.forEach((logic: LogicIdcEnv) => {
          if (logic.LogicIdc.ID === l.logicIdcID) {
            if (rsIds.value.includes(logic.ID)) {
              (nodesTree[index].children as NodeTree[]).push({
                id: logic.ID,
                title: logic.Env?.Name,
                key: logic.ID + '-' + l.logicIdcID + '-' + logic.Env?.ID,
                checked: true,
                selected: true
              })
            } else {
              (nodesTree[index].children as NodeTree[]).push({
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
  })

  return {
    clusterId,
    clusterInfo,
    appId,
    getClusterInfo,
    getLogicIdcEnv,
  }
}
