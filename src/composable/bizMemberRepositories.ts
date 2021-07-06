import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import devopsRepository from "@/api/devopsRepository";
import { Members } from "@/utils/response";

export default function bizMemberRepositories() {
  const bizMembers = ref<Members[]>([])
  const route = useRoute()
  const bizId = ref(parseInt(route.query.bizId as string, 10))
  const getMembers = async () => {
    try {
      bizMembers.value = await devopsRepository.queryMembersByBizId(bizId.value)
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getMembers)
  watch(() => route.query, (value) => {
    const id = parseInt(value.bizId as string, 10)
    bizId.value = id
  })
  watch(bizId, () => {
    getMembers().then()
  })

  return {
    bizMembers,
    getMembers,
  }
}
