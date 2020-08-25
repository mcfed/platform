import {FetchUtils} from '@mcfed/utils';
import {IApi} from './interface';

export default class Api implements IApi {
  fetchPage(params: any) {
    return FetchUtils.fetchList(`${API_PREFIX}/{@api_prefix@}`, {
      body: params
    });
  }
  
}
