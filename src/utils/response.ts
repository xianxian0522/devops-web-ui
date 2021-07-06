export interface LoginResponse {
  url?: string;
  token?: string;
}
export interface BarItem {
  id: number;
  icon?: string;
  path: string;
  name: string;
  route?: string;
  children?: BarItem[];
}
export interface Hosts {
  BizStatus: string;
  Comment: string;
  CreatedAt: string;
  Detail: string;
  Hostname: string;
  ID: number;
  InnerIP: number;
  LgDevType: string;
  Name: string;
  OsBit: string;
  OsDetail: string;
  OsName: string;
  OsType: string;
  OsVersion: string;
  UpdatedAt: string;
}
export interface Owner {
  CreatedAt: string;
  ID: number;
  State: string;
  UpdatedAt: string;
  Username: string;
}
export interface BizResponse {
  Comment?: string;
  CreatedAt?: string;
  DisplayName?: string;
  ID?: number;
  Name?: string;
  UpdatedAt?: string;
  Hosts?: Hosts[];
  Owner?: Owner;
}
export interface BindInfos {
  Ip?: string;
  Name?: string;
  Port?: number;
  Protocol?: string;
}
export interface InstanceTemplate {
  BindInfos?: BindInfos[];
  DataDir?: string;
  EnvVars?: {[key: string]: string}[]
  LogDir?: string;
  MetricEndpoint?: string;
  User?: string;
  WorkDir?: string;
  HostID?: number;
  HostInnerIP?: string;
  ID?: number;
  Name?: string;
}
export interface AppResponse {
  CreatedAt?: string;
  DisplayName?: string;
  ID: number;
  InstanceTemplate?: InstanceTemplate;
  Level?: string;
  Name?: string;
  ReleaseInfo?: {[key: string]: string};
  UpdatedAt?: string;
}
export interface Members {
  CreatedAt?: string;
  ID: number;
  Role?: string;
  UpdatedAt?: string;
  UserID?: number;
  UserRealName?: string;
  Username?: string;
}
