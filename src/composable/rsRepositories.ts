import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";
import { NodeTree, ReplicaSet } from "@/utils/response";

export default function rsRepositories() {
  const rsList = ref<ReplicaSet[]>([])
  const nodesTree = ref<NodeTree[]>([])
  // const rsIds = ref<(number | undefined)[]>([])
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const clusterId = ref(parseInt(route.params.clusterId as string, 10))

  const getRs = async () => {
    try {
      rsList.value = await devopsRepository.queryRsByCluId(clusterId.value)
      // rsIds.value = rsList.value?.map(r => r.LogicIdcEnv?.ID)
      const logic = rsList.value.map((r: ReplicaSet) => ({logicIdcId: r.LogicIdcEnv.LogicIdc.ID, name: r.LogicIdcEnv.LogicIdc.Name}))
      const result: any = []
      const obj: any = {}
      logic.forEach(item => {
        if (!obj[item.logicIdcId]) {
          result.push(item)
          obj[item.logicIdcId] = true
        }
      })
      result.forEach((logicIdc: any, index: number) => {
        nodesTree.value.push({
          title: logicIdc.name,
          key: logicIdc.logicIdcId,
          expanded: true,
          children: [],
        })
        rsList.value.forEach((rs: ReplicaSet) => {
          if (logicIdc.logicIdcId === rs.LogicIdcEnv.LogicIdc.ID) {
            (nodesTree.value[index].children as NodeTree[]).push({
              title: rs.LogicIdcEnv.Env.Name,
              key: rs.ID + '-' + rs.LogicIdcEnv.ID,
              id: rs.ID,
              checked: true,
              selected: false,
            })
          }
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(getRs)


  return {
    // rsIds,
    rsList,
    clusterId,
    appId,
    nodesTree,
    getRs,
  }
}
