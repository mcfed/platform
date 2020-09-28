import {IReducer, IReducerState} from './interface';
import {BaseReducer} from '@user-center/framework';

export default class DemoReducer extends BaseReducer implements IReducer {
  private initalState: IReducerState = {
    page: {
      pageSize: 10,
      total: 0
    }
  };
  getReducer() {}
}
