import {FetchUtils} from '@mcfed/utils';
import {IApi} from './interface';

export default class Api implements IApi {
  fetchPage(params: any) {
    return FetchUtils.fetchList(`${API_PREFIX}/{@api_prefix@}`, {
      body: params
    });
  }
  fetchItem(params: any) {
    return FetchUtils.fetchGet(`${API_PREFIX}/{@api_prefix@}/id`, {
      body: params
    });
  }

  fetchSave(params: any) {
    return FetchUtils.fetchPost(`${API_PREFIX}/{@api_prefix@}/id`, {
      body: params
    });
  }

  fetchUpdate(params: any) {
    return FetchUtils.fetchPost(`${API_PREFIX}/{@api_prefix@}/id`, {
      body: params
    });
  }

  fetchDelete(params: any) {
    return FetchUtils.fetchPost(`${API_PREFIX}/{@api_prefix@}/id`, {
      body: params
    });
  }
}
