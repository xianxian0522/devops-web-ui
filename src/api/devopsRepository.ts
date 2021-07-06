import request from "@/utils/request";
import { AppResponse, BarItem, BizResponse, LoginResponse, Members, UserResponse } from "@/utils/response";

const API = '/api/v1/my';
const ApiLogin = '/api/v1/sso/login';
const ApiBiz = `${API}/biz`;
const ApiApp = `${API}/app`;

let ApiBar = '/api/my/bar';
if (window.location.hostname.endsWith('dev.ops.sumscope.com')) {
  ApiBar = 'http://menu.dev.ops.sumscope.com:3000' + ApiBar;
} else if (window.location.hostname.endsWith('ops.sumscope.com')) {
  ApiBar = 'http://menu.ops.sumscope.com' + ApiBar;
}

export default {
  queryBar: () => request.get<BarItem[]>(ApiBar),
  login: () => request.get<LoginResponse>(ApiLogin),

  queryAllUser: () => request.get<UserResponse[]>(`${API}/users`),

  deleteBizMember: (mId: number) => request.get(`${API}/bizmember/${mId}`),

  queryAllBiz: () => request.get<BizResponse[]>(`${ApiBiz}`),
  queryBizInfoById: (bizId: number) => request.get<BizResponse>(`${ApiBiz}/${bizId}`),
  queryAppByBizId: (bizId: number) => request.get<AppResponse[]>(`${ApiBiz}/${bizId}/app`),
  queryMembersByBizId: (bizId: number) => request.get<Members[]>(`${ApiBiz}/${bizId}/member`),
  updateMember: (bizId: number, params: any) => request.post(`${ApiBiz}/${bizId}/member`, params),
  updateBizInfo: (bizId: number, params: any) => request.patch(`${ApiBiz}/${bizId}`, params),
}
