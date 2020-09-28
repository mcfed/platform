import {Middleware} from '@mcfed/core';
import Action from '../action';
import Reducer from '../reducer';
import Api from '../api';

jest.mock('../api', () => jest.fn().mockImplementation(() => ({})));
jest.mock('../reducer');

describe('Action单元测试', () => {
  let action: Action;

  beforeEach(() => {
    action = new Action(
      new Reducer(),
      new Api(),
      new Middleware.MiddlewareFactory()
    );
  });

  it('初始化测试', () => {
    expect(Reducer).toHaveBeenCalled();
    expect(Api).toHaveBeenCalled();
  });
});
