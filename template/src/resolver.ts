import { GraphQLInt } from 'graphql';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import { DemoData, InputDemo } from './type';
import { getReturnType } from './utils';
import Api from './api';

export const resolverFunctionNameTypes = {
  demo: 'demo',
  addRecipe: 'addRecipe',
  updateRecipe: 'updateRecipe',
  deleteRecipe: 'deleteRecipe'
}

@Resolver()
export default class Resolvers {
  constructor(readonly apiService: Api) {}

  @Query(getReturnType(DemoData, true))
  async demo(
    @Arg("page", type => GraphQLInt, { nullable: true }) page: Number,
    @Arg("size", type => GraphQLInt, { nullable: true }) size: Number,
  ):Promise<any> {
    // 业务代码。。。API调用。。。
    return await this.apiService.fetchPage({ page, size });
  }
  
  @Mutation(getReturnType(DemoData))
  async add(
    @Arg("data", { nullable: true }) data: InputDemo
   ):Promise<any> {
   return await this.apiService.fetchUpdate(data);
  }

  @Mutation(getReturnType(DemoData))
  async update():Promise<any> {
   return await this.apiService.fetchUpdate();
  }

  @Mutation(getReturnType(DemoData))
  async delete(
    @Arg("id") id: string
   ):Promise<any> {
   return await this.apiService.fetchDelete({ id });
  }
}
