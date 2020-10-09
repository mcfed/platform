import Reducer from '../reducer';

describe('Reducer单元测试', () => {
  let reducer: Reducer;

  beforeEach(() => {
    reducer = new Reducer();
  });

  it('初始值测试', () => {
    expect(Reflect.get(reducer, 'initalState')).toEqual({
      page: {
        pageSize: 10,
        total: 0
      }
    });
  });
});
