import { onMounted, ref } from "vue";
import { BizResponse } from "@/utils/response";
import devopsRepository from "@/api/devopsRepository";

export default function bizInfoRepositories(appId: number) {
  const bizInfo = ref<BizResponse>()
  const getBizInfo = async () => {
    try {
      if (appId > 0) {
        bizInfo.value = await devopsRepository.queryBizInfoById(appId)
      }
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getBizInfo)

  return {
    bizInfo,
  }
}
