import request from "@/utils/request";
import {
  AppResponse,
  BarItem,
  BizResponse, Cluster,
  Hosts,
  Instance, LogicIdcEnv,
  LoginResponse,
  Members, ReplicaSet,
  UserResponse
} from "@/utils/response";

const API = '/api/v1/my';
const ApiLogin = '/api/v1/sso/login';
const ApiBiz = `${API}/biz`;
const ApiApp = `${API}/app`;
const ApiCluster = `${API}/cluster`;

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

  queryClusterInfoByCluId: (cId: number) => request.get<Cluster>(`${ApiCluster}/${cId}`),
  queryRsByCluId: (cId: number) => request.get<ReplicaSet[]>(`${ApiCluster}/${cId}/rs`),
  updateClusterByCluId: (cId: number, params: any) => request.patch(`${ApiCluster}/${cId}`, params),
  clusterBindLogicIdcEnv: (cId: number, lId: number) => request.post(`api/v1/my/cluster/${cId}/logicidcenv/${lId}`),
  clusterDeleteLogicIdcEnv: (cId: number, lId: number) => request.delete(`api/v1/my/cluster/${cId}/logicidcenv/${lId}`),

  queryLogicIdcEnv: () => request.get<LogicIdcEnv[]>(`${API}/logicidcenv`),
  queryRsInstanceByRsId: (rsId: number) => request.get<Instance[]>(`${API}/rs/${rsId}/instance`),
  addInstanceByRsId: (rsId: number, params: any) => request.post(`${API}/rs/${rsId}`, params),
  updateInstanceByInsId: (insId: number, params: any) => request.patch(`${API}/instnace/${insId}`, params),

  deleteBizMember: (mId: number) => request.delete(`${API}/bizmember/${mId}`),
  deleteAppMember: (mId: number) => request.delete(`${API}/appmember/${mId}`),

  queryAllBiz: () => request.get<BizResponse[]>(`${ApiBiz}`),
  queryBizInfoById: (bizId: number) => request.get<BizResponse>(`${ApiBiz}/${bizId}`),
  queryAppByBizId: (bizId: number) => request.get<AppResponse[]>(`${ApiBiz}/${bizId}/app`),
  queryMembersByBizId: (bizId: number) => request.get<Members[]>(`${ApiBiz}/${bizId}/member`),
  queryHostsByBizId: (bizId: number) => request.get<Hosts[]>(`${ApiBiz}/${bizId}/host`),
  updateBizMember: (bizId: number, params: any) => request.post(`${ApiBiz}/${bizId}/member`, params),
  updateBizInfo: (bizId: number, params: any) => request.patch(`${ApiBiz}/${bizId}`, params),
  transferOwnerByBizId: (bizId: number, params: any) => request.patch(`${ApiBiz}/${bizId}/transfer`, params),
  deleteDistributionHostToApp: (bizId: number, appId: number, hostId: number) => request.delete(`${ApiBiz}/${bizId}/app/${appId}/host/${hostId}`),
  distributionHostToApp: (bizId: number, appId: number, hostId: number) => request.post(`${ApiBiz}/${bizId}/app/${appId}/host/${hostId}`),

  queryAppInfoById: (appId: number) => request.get<AppResponse>(`${ApiApp}/${appId}`),
  queryMembersByAppId: (appId: number) => request.get<Members[]>(`${ApiApp}/${appId}/member`),
  queryHostsByAppId: (appId: number) => request.get<Hosts[]>(`${ApiApp}/${appId}/host`),
  queryAppHostInstance: (appId: number, hostId: number) => request.get<Instance[]>(`${ApiApp}/${appId}/host/${hostId}/instance`),
  queryClusterByAppId: (appId: number) => request.get<Cluster[]>(`${ApiApp}/${appId}/cluster`),
  updateAppMember: (appId: number, params: any) => request.post(`${ApiApp}/${appId}/member`, params),
  updateAppInfo: (appId: number, params: any) => request.patch(`${ApiApp}/${appId}`, params),
  addAppCluster: (appId: number, params: any) => request.post(`${ApiApp}/${appId}/cluster`, params),
  transferOwnerByAppId: (appId: number, params: any) => request.patch(`${ApiApp}/${appId}/transfer`, params),

}
