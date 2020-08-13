import {message} from 'antd';

const SHOW_SUCCESS = '@@MIDDLEWARE/showSuccess';
const SHOW_ERROR = '@@MIDDLEWARE/showError';
const SHOW_COMFIRM = '@@MIDDLEWARE/showComfirm';
const SHOW_MESSAGE = '@@MIDDLEWARE/showMessage';

export function showSuccess(payload: any) {
  return {
    type: SHOW_SUCCESS,
    payload: payload
  };
}

export function showError(payload: any) {
  return {
    type: SHOW_ERROR,
    payload: payload
  };
}

export function showComfirm(payload: any) {
  return {
    type: SHOW_COMFIRM,
    payload: payload
  };
}

export function showMessage(payload: any) {
  return {
    type: SHOW_MESSAGE,
    payload: payload
  };
}

export default function createMessage(message: any) {
  return ({getState, dispatch}: {getState: Function; dispatch: Function}) => (
    next: any
  ) => (action: any) => {
    if (SHOW_SUCCESS === action.type) {
      message.success(action.payload || '操作成功');
    } else if (SHOW_ERROR === action.type) {
      message.error(action.payload);
    } else if (SHOW_COMFIRM === action.type) {
      message.comfirm(action.payload);
    } else if (SHOW_MESSAGE === action.type) {
      message.message(action.payload);
    }
    return next(action);
  };
}

export const messageMiddleware = createMessage({
  success: function(msg: any) {
    // TODO: 使用国际化渲染提示信息
    message.success(msg);
  },
  error: function(msg: any) {
    message.error(msg);
  },
  comfirm: function() {},
  message: function() {}
});
