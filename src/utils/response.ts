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
}

