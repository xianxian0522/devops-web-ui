import { onMounted, ref } from "vue";
import devopsRepository from "@/api/devopsRepository";
import { BizResponse } from "@/utils/response";

export default function bizRepositories() {
  const bizId = ref()
  const bizList = ref<BizResponse[]>([])
  const getBizList = async () => {
    try {
      bizList.value = await devopsRepository.queryAllBiz()
      const id = parseInt(localStorage.getItem('bizId') as string, 10)
      if (!id) {
        bizId.value = bizList.value?.[0].ID
      } else {
        bizId.value = id
      }
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getBizList)

  return {
    bizId,
    bizList,
  }
}
