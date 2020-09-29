import {PK} from '@mcfed/crud';
declare var API_PREFIX: string;
declare namespace NodeJS {
  interface Global {
    API_PREFIX: string;
  }
}

export interface IModel {
  id: number;
  {@#columns@}
    {@name@}?: string;
  {@/columns@}
}

export interface IAction {
  fetchPage(params: any): Promise<void>;
  fetchItem(id: PK): Promise<void>;
  fetchSave(params: any): Promise<void>;
  fetchUpdate(params: any): Promise<void>;
  fetchDelete(ids: PK | PK[]): Promise<void>;
}

export interface IReducer {
  getReducer(): void;
}

export interface IApi {
  fetchPage(params: any): Promise<any>;
 }

export interface IReducerState {
  page?: {
    pageSize?: number;
    total?: number;
    current?: number;
  };
}

// graphql 类型
export interface PagernateQuery {
  page?: number
  size: number
}

// TODO: 描述各action、reducer、api需要的参数类型
