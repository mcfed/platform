import {
  saverReducer,
  createSaverMiddleware,
  updateExpires
} from '../middleware';

describe('测试saverReducer修改状态', () => {
  it('saverReducer', () => {
    expect(
      saverReducer(undefined, {type: '', payload: new Date()})
    ).toStrictEqual({expires: undefined});
  });

  it('saveReducer action updateExpires', () => {
    const now = new Date();
    expect(saverReducer(undefined, updateExpires(now)).expires).toBe(now);
  });
});

describe('测试middleware', () => {
  it('createSaverMiddleware', () => {
    // const saver = new ScreenSaver()
  });
});
