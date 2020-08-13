import {renderHook} from '@testing-library/react-hooks';
import {Dispatch} from 'redux';
import {MenuKeyEnum} from '../components';

import {
  useHandleMenuSelect,
  useLogoutAction
} from '../layouts/hooks';

describe('layout hooks', () => {
  const action = {type: 'test'};
  const history: any = {push: jest.fn()};
  const dispatch: Dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('useLogoutAction', () => {
    const {result} = renderHook(() => useLogoutAction());
    expect(result).toMatchSnapshot();
  });

  // it.skip('useDidMount|无token', () => {
  //   renderHook(() => {
  //     useDidMount({appReducer: {}});
  //   });
  //   expect(dispatch).toHaveBeenCalledWith(action);
  // });

  // it.skip('useDidMount|有token', () => {
  //   renderHook(() => {
  //     useDidMount({appReducer: {token: 'test'}});
  //   });
  //   expect(dispatch).toHaveBeenCalledTimes(0);
  // });

  it('useHandleMenuSelect|profile', () => {
    const {result} = renderHook(() =>
      useHandleMenuSelect({userId: 123, history, action, dispatch})
    );
    result.current(MenuKeyEnum.profile);
    expect(history.push).toHaveBeenCalledWith('/my/profile');
  });

  it('useHandleMenuSelect|passwd', () => {
    const {result} = renderHook(() =>
      useHandleMenuSelect({userId: 123, history, action, dispatch})
    );
    result.current(MenuKeyEnum.passwd);
    expect(history.push).toHaveBeenCalledWith('/my/profile/config/123/edit');
  });

  it('useHandleMenuSelect|logout', () => {
    const {result} = renderHook(() =>
      useHandleMenuSelect({userId: 123, history, action, dispatch})
    );
    result.current(MenuKeyEnum.logout);
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
