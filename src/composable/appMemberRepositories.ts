import { Members } from "@/utils/response";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import devopsRepository from "@/api/devopsRepository";

export default function appMemberRepositories() {
  const appMembers = ref<Members[]>([])
  const route = useRoute()
  const appId = ref(parseInt(route.params.appId as string, 10))
  const getMembers = async () => {
    try {
      appMembers.value = await devopsRepository.queryMembersByAppId(appId.value)
    } catch (e) {
      console.error(e)
    }
  }
  onMounted(getMembers)

  return {
    appMembers,
    getMembers,
  }
}
