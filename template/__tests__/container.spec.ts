import {dispatchToProps} from '../container';
it('dispatchToProps', () => {
  const result = dispatchToProps(jest.fn(), {});
  expect('dispatch' in result).toBeTruthy();
  expect('actions' in result).toBeTruthy();
});
