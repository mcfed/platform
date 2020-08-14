import BaseReducer from '../reducer';

describe('BaseReducer unit test', () => {
  let reducer: BaseReducer;

  beforeEach(() => {
    reducer = new BaseReducer();
  });

  it('savePage', () => {
    const result = reducer.savePage({
      pageSize: 10,
      currentPage: 20,
      total: 30
    });

    expect(result).toEqual({
      page: {
        total: 30,
        pageSize: 10,
        current: 20
      }
    });
  });

  it('saveList', () => {
    const result = reducer.saveList({
      currentPage: 20,
      total: 30
    });

    expect(result).toEqual({
      page: {
        total: 30,
        current: 20
      }
    });
  });

  it('saveItem', () => {
    const result = reducer.saveItem({
      params: 'test'
    });

    expect(result).toEqual({});
  });
});
