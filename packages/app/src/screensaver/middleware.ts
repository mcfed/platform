import {Action, AnyAction} from 'redux';
import {IScreenSaver} from './interface';

const UPDATE_EXPIRES = '@@MIDDLEWARE/UPDATE_EXPIRES';

interface IAction<T> extends Action {
  payload: T;
}

export function updateExpires(payload: Date): IAction<Date> {
  return {
    type: UPDATE_EXPIRES,
    payload
  };
}

export function saverReducer(
  state = {expires: undefined},
  action: IAction<Date>
) {
  switch (action.type) {
    case UPDATE_EXPIRES:
      return {
        expires: action.payload
      };
    default:
      return state;
  }
}

export function createSaverMiddleware(screenSaver: IScreenSaver) {
  return ({getState, dispatch}: {getState: Function; dispatch: Function}) => (
    next: any
  ) => (action: any) => {
    const {expires} = getState().screenReducer;
    if (action.type !== UPDATE_EXPIRES) {
      if (!screenSaver.checkExpires(expires)) {
        screenSaver.delayLock(function() {
          dispatch(updateExpires(screenSaver.calcDelay()));
        });
      } else {
        screenSaver.lockScreen(function() {
          dispatch(updateExpires(screenSaver.calcDelay()));
        });
      }
    }
    return next(action);
  };
}
