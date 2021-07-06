import { onMounted, ref, watch } from "vue";
import { BizResponse } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";
import { useRoute } from "vue-router";

export default function bizInfoRepositories() {
  const bizInfo = ref<BizResponse>()
  const route = useRoute()
  const bizId = ref(parseInt(route.query.bizId as string, 10))
  const getBizInfo = async () => {
    try {
      if (bizId.value > 0) {
        bizInfo.value = await devopsRepository.queryBizInfoById(bizId.value)
      }
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getBizInfo)
  watch(() => route.query, (value) => {
    const id = parseInt(value.bizId as string, 10)
    bizId.value = id
  })
  watch(bizId, () => {
    getBizInfo().then()
  })

  return {
    bizInfo,
  }
}
