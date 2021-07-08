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
export interface BizResponse {
  Comment?: string;
  CreatedAt?: string;
  DisplayName?: string;
  ID?: number;
  Name?: string;
  UpdatedAt?: string;
  Hosts?: Hosts[];
  Owner?: User;
}
export interface BindInfos {
  Ip?: string;
  Name?: string;
  Port?: number;
  Protocol?: string;
}
export interface EnvVar {
  Name: string;
  Value: string;
}
export interface InstanceTemplate {
  BindInfos?: BindInfos[];
  DataDir?: string;
  EnvVars?: EnvVar[];
  LogDir?: string;
  MetricEndpoint?: string;
  User?: string;
  WorkDir?: string;
  HostID?: number;
  HostInnerIP?: string;
  ID?: number;
  Name?: string;
  Comment?: string;
  State?: string;
}
export interface AppResponse {
  CreatedAt?: string;
  DisplayName?: string;
  ID: number;
  Comment?: string;
  InstanceTemplate?: InstanceTemplate;
  Level?: string;
  Name?: string;
  ReleaseInfo?: {[key: string]: string};
  UpdatedAt?: string;
  AppMembers?: Members[];
  Hosts?: Hosts[];
  Owner?: User;
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
export interface UserResponse {
  ID: number;
  RealName?: string;
  Username?: string;
}
export interface User {
  CreatedAt?: string;
  DingTalkUserID?: string;
  ID: number;
  Mail?: string;
  Password?: string;
  RealName?: string;
  State?: string;
  UpdatedAt?: string;
  Username?: string;
}
export interface Hosts {
  Apps?: AppResponse[];
  BizStatus?: string;
  Comment?: string;
  CreatedAt?: string;
  Detail?: string;
  Disk?: [
    {
      Device: string;
      FsType: string;
      MountPoint: string;
      SizeGB: number
    }
  ];
  Hostname?: string;
  ID: number;
  InnerIP?: string;
  LgDevType?: string;
  Name?: string;
  OsBit?: string;
  OsDetail?: string;
  OsName?: string;
  OsType?: string;
  OsVersion?: string;
  UpdatedAt?: string;
}
export interface Instance {
  BindInfos?: BindInfos[];
  Comment?: string;
  CreatedAt?: string;
  EnvVars?: EnvVar[];
  ID: number;
  Name?: string;
  ReplicaSet?: ReplicaSet;
  State?: string;
  UpdatedAt?: string;
  User?: string;
}
export interface Cluster {
  App?: AppResponse;
  Comment?: string;
  CreatedAt?: string;
  ID: number;
  InstanceTemplate?: InstanceTemplate;
  Name?: string
  UpdatedAt?: string;
  ReplicaSets?: ReplicaSet[];
}
export interface Env {
  CreatedAt?: string;
  DisplayName?: string;
  EnvVars?: EnvVar[];
  ID: number;
  Name?: string;
  UpdatedAt?: string;
}
export interface LogicIdc {
  CreatedAt?: string;
  DisplayName?: string;
  EnvVars?: EnvVar[];
  ID?: number;
  Name?: string;
  UpdatedAt?: string;
}
export interface LogicIdcEnv {
  CreatedAt?: string;
  Env?: Env;
  EnvVars?: EnvVar[];
  ID: number;
  LogicIdc?: LogicIdc;
  UpdatedAt?: string;
}
export interface ReplicaSet {
  Cluster?: Cluster;
  Comment?: string;
  CreatedAt?: string;
  ID: number;
  InstanceTemplate?: InstanceTemplate;
  LogicIdcEnv?: LogicIdcEnv;
  UpdatedAt?: string;
}

