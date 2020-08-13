export interface User {
  id?: number;
  accountName?: string;
  level?: string;
  needSetPd?: boolean;
  token?: string;
  userName?: string;
}

export interface ApiResData<T> {
  code: number;
  msg: string;
  data: T;
}

export interface RouteItem<T = any, K = string> {
  id?: string | number;
  name: K;
  key?: K;
  icon?: string;
  path: string;
  component?: any;
  visiable?: boolean;
  routes?: RouteItem<T, K>[];
}

export type RouterConfig<T = any, K = string> = RouteItem<T, K>[];
