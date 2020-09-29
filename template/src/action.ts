import {InjectFactory, Middleware, Decorator} from '@mcfed/core';
import {PK} from '@mcfed/crud';
import {BaseAction} from '@user-center/framework';
import {IAction} from './interface';
import Api from './api.graphql';
import Reducer from './reducer';

const {MiddlewareFactory} = Middleware;
const {Injectable} = InjectFactory;
const {param, loading} = Decorator;

@Injectable
export default class Action extends BaseAction implements IAction {
  constructor(
    public readonly reducer: Reducer,
    public readonly api: Api,
    public readonly middleware: Middleware.MiddlewareFactory
  ) {
    super(reducer, api, middleware);
  }
}
