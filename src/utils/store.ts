import { BizResponse } from "@/utils/response";
import { reactive, UnwrapRef } from "vue";

export interface Biz {
  bizInfo: BizResponse;
}

export const bizState: UnwrapRef<Biz> = reactive({
  bizInfo: {},
})
