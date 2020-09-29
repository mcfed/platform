import * as gqb from 'gql-query-builder'
import {PagernateQuery } from './interface'
const commonQuery = [
    'name',
    'title'
]
const resolverFunctionNameTypes = {
  demo: 'demo',
  add: 'add',
  update: 'update',
  delete: 'delete'
}

const getBaseResponseQuery = (data:Array<any>) => {
    return [
        'code', 
        'message', 
        {
          data
        }
    ]
}

const getBaseList = (list: Array<any>) => {
  return [
    'pageSize',
    'currentPage',
    'total',
    {
      list
    }
  ]
}
enum QueryType {
  Query='query',
  Mutation='mutation'
}
const alias = (type:QueryType) => {
  const func = gqb[type]
  return (operation:string, variables:any, fields:any) => {
    const res = func({
      operation,
      variables,
      fields
    })
    if (res && res.query.indexOf(operation) !== -1) {
        const reg=new RegExp(operation, 'i');
        res.query = res.query.replace(reg, 'result:'+operation)
    }
    return res
  }
}


export const getQuery = (variables: PagernateQuery) => alias(QueryType.Query)(
  resolverFunctionNameTypes.demo,
  variables,
  getBaseResponseQuery(getBaseList(commonQuery))
)

export const mutationAdd = (variables: any) => alias(QueryType.Mutation)(
  resolverFunctionNameTypes.add,
  variables,
  getBaseResponseQuery(commonQuery)
)

export const mutationUpdate = (variables: any) => alias(QueryType.Mutation)(
  resolverFunctionNameTypes.update,
  variables,
  getBaseResponseQuery(commonQuery)
)


export const mutationDelete = (variables: any) => alias(QueryType.Mutation)(
  resolverFunctionNameTypes.delete,
  variables,
  getBaseResponseQuery(commonQuery)
)