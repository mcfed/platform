import {goBack, push} from 'connected-react-router';
import {Selector} from '@mcfed/core';
const GO_BACK = '@@MIDDLEWARE/goBack';
const REFRESH = '@@MIDDLEWARE/refreshPage';
const PUSH = '@@MIDDLEWARE/push';

export function createRouter() {
  return ({getState, dispatch}: {getState: Function; dispatch: Function}) => (
    next: any
  ) => async (action: any) => {
    if (GO_BACK === action.type) {
      dispatch(goBack());
    } else if (PUSH === action.type) {
      dispatch(push(action.payload));
    } else if (REFRESH === action.type) {
      const {fn, scope} = action.payload;
      if (typeof fn === 'function') {
        await fn.call(scope, Selector.querys(getState(), fn.toString()));
      } else {
        throw new Error('action payload is not function');
      }
    }
    return next(action);
  };
}
