import {FetchUtils} from '@mcfed/utils';
import {IApi} from './interface';

export default class Api implements IApi {
  async fetchPage(params: any, headers = {}):Promise<any> {
    return FetchUtils.fetchList(`${API_PREFIX}/list`, {
      body: params,
      headers
    });
  }
  async fetchItem(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchGraphql(`${API_PREFIX}/:id`, {
      body: params,
      headers
    });
  }
  async fetchUpdate(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchPost(`${API_PREFIX}/update`, {
      body: params,
      headers
    })
  }
  async fetchDelete(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchDelete(`${API_PREFIX}/delete`, {
      body: params,
      headers
    })
  }
}
