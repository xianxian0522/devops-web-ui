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

