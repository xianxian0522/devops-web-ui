import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import devopsRepository from "@/api/devopsRepository";
import { Hosts } from "@/utils/response";

export default function bizHostRepositories() {
  const hostList = ref<Hosts[]>([])
  const data = ref<Hosts[]>([])
  const route = useRoute()
  const bizId = ref(parseInt(route.query.bizId as string, 10))
  const getHost = async () => {
    try {
      if (bizId.value > 0) {
        hostList.value = await devopsRepository.queryHostsByBizId(bizId.value)
        data.value = hostList.value
      }
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getHost)
  watch(() => route.query, (value) => {
    const id = parseInt(value.bizId as string, 10)
    bizId.value = id
  })
  watch(bizId, () => {
    getHost().then()
  })

  return {
    data,
    hostList,
    bizId,
  }
}
