import {Middleware} from '@mcfed/core';

import BaseAction from '../action';

const Api = jest.fn().mockImplementation(() => ({
  fetchPage: jest.fn(),
  fetchItem: jest.fn(),
  fetchDelete: jest.fn(),
  fetchSave: jest.fn(),
  fetchUpdate: jest.fn()
}));

const Reducer = jest.fn().mockImplementation(() => ({
  savePage: jest.fn(),
  saveItem: jest.fn()
}));

const mockParams = {
  params: 'test'
};

const successMockData = {
  code: 200,
  data: {
    test: 'test'
  },
  msg: 'success'
};

const errorMockData = {
  code: 400,
  data: null,
  msg: 'error'
};

describe('BaseAction unit test', () => {
  let action: BaseAction;

  beforeEach(() => {
    action = new BaseAction(
      new Reducer(),
      new Api(),
      new Middleware.MiddlewareFactory()
    );
  });

  it('包含方法测试', () => {
    expect(BaseAction.prototype.hasOwnProperty('fetchPage')).toBeTruthy();
    expect(BaseAction.prototype.hasOwnProperty('fetchItem')).toBeTruthy();
    expect(BaseAction.prototype.hasOwnProperty('fetchDelete')).toBeTruthy();
    expect(BaseAction.prototype.hasOwnProperty('fetchSave')).toBeTruthy();
    expect(BaseAction.prototype.hasOwnProperty('fetchUpdate')).toBeTruthy();
  });

  it('fetchPage-success', async () => {
    (action.api.fetchPage as jest.Mock).mockResolvedValueOnce(successMockData);
    await action.fetchPage(mockParams);
    expect(action.api.fetchPage).toHaveBeenCalledWith(mockParams);
    expect(action.reducer.savePage).toHaveBeenCalledWith(successMockData.data);
  });
  it('fetchPage-error', async () => {
    (action.api.fetchPage as jest.Mock).mockResolvedValueOnce(errorMockData);
    const showErrorSpy = jest.spyOn(action.middleware, 'showError');
    await action.fetchPage(mockParams);
    expect(action.api.fetchPage).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
  });

  it('fetchItem-success', async () => {
    (action.api.fetchItem as jest.Mock).mockResolvedValueOnce(successMockData);
    await action.fetchItem('test');
    expect(action.api.fetchItem).toHaveBeenCalledWith('test');
    expect(action.reducer.saveItem).toHaveBeenCalledWith(successMockData.data);
  });
  it('fetchItem-error', async () => {
    (action.api.fetchItem as jest.Mock).mockResolvedValueOnce(errorMockData);
    const showErrorSpy = jest.spyOn(action.middleware, 'showError');
    await action.fetchItem('test');
    expect(action.api.fetchItem).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
  });

  it('fetchDelete-success', async () => {
    (action.api.fetchDelete as jest.Mock).mockResolvedValueOnce(
      successMockData
    );
    const showSuccessSpy = jest.spyOn(action.middleware, 'showSuccess');
    const refreshPageSpy = jest.spyOn(action.middleware, 'refreshPage');
    await action.fetchDelete('test');
    expect(action.api.fetchDelete).toHaveBeenCalledWith('test');
    expect(showSuccessSpy).toHaveBeenCalledWith('请求成功！');
    expect(refreshPageSpy).toHaveBeenCalledWith({
      fn: action.fetchPage,
      scope: action
    });
  });
  it('fetchDelete-error', async () => {
    (action.api.fetchDelete as jest.Mock).mockResolvedValueOnce(errorMockData);
    const showErrorSpy = jest.spyOn(action.middleware, 'showError');
    await action.fetchDelete('test');
    expect(action.api.fetchDelete).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
  });

  it('fetchSave-success', async () => {
    (action.api.fetchSave as jest.Mock).mockResolvedValueOnce(successMockData);
    const showSuccessSpy = jest.spyOn(action.middleware, 'showSuccess');
    const goBackSpy = jest.spyOn(action.middleware, 'goBack');
    const refreshPageSpy = jest.spyOn(action.middleware, 'refreshPage');
    await action.fetchSave('test');
    expect(action.api.fetchSave).toHaveBeenCalledWith('test');
    expect(showSuccessSpy).toHaveBeenCalledWith('请求成功！');
    expect(goBackSpy).toHaveBeenCalled();
    expect(refreshPageSpy).toHaveBeenCalledWith({
      fn: action.fetchPage,
      scope: action
    });
  });
  it('fetchSave-error', async () => {
    (action.api.fetchSave as jest.Mock).mockResolvedValueOnce(errorMockData);
    const showErrorSpy = jest.spyOn(action.middleware, 'showError');
    await action.fetchSave('test');
    expect(action.api.fetchSave).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
  });

  it('fetchUpdate-success', async () => {
    (action.api.fetchUpdate as jest.Mock).mockResolvedValueOnce(
      successMockData
    );
    const showSuccessSpy = jest.spyOn(action.middleware, 'showSuccess');
    const goBackSpy = jest.spyOn(action.middleware, 'goBack');
    const refreshPageSpy = jest.spyOn(action.middleware, 'refreshPage');
    await action.fetchUpdate('test');
    expect(action.api.fetchUpdate).toHaveBeenCalledWith('test');
    expect(showSuccessSpy).toHaveBeenCalledWith('请求成功！');
    expect(goBackSpy).toHaveBeenCalled();
    expect(refreshPageSpy).toHaveBeenCalledWith({
      fn: action.fetchPage,
      scope: action
    });
  });
  it('fetchUpdate-error', async () => {
    (action.api.fetchUpdate as jest.Mock).mockResolvedValueOnce(errorMockData);
    const showErrorSpy = jest.spyOn(action.middleware, 'showError');
    await action.fetchUpdate('test');
    expect(action.api.fetchUpdate).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
  });
});
