import {FetchUtils} from '@mcfed/utils';
import {IApi} from './interface';
import { getQuery, mutationUpdate, mutationDelete } from './query'

export default class Api implements IApi {
  async fetchPage(params: any, headers={}):Promise<any> {
    return FetchUtils.fetchGraphqlList(`${GRAPHQL_API_PREFIX}/graphql`, {
      body: getQuery(params) as any,
      headers
    });
  }
  async fetchUpdate(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchGraphql(`${GRAPHQL_API_PREFIX}/graphql`, {
      body: mutationUpdate(params) as any,
      headers
    })
  }
  async fetchDelete(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchGraphql(`${GRAPHQL_API_PREFIX}/graphql`, {
      body: mutationDelete(params) as any,
      headers
    })
  }
}
