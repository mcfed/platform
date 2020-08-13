import {useEffect, useCallback, useMemo} from 'react';
import {Dispatch, AnyAction} from 'redux';
import {History} from 'history';
import {Middleware} from '@mcfed/core';
import {MenuKeyEnum} from '../components';

const {fetchLogouting} = Middleware.passportMiddleware;

interface DidMountParams {
  appReducer: any;
}

export function useLogoutAction() {
  return useMemo(() => fetchLogouting({}), []);
}



interface HandleMenuSelectParams {
  history: History;
  userId: number;
  dispatch: Dispatch;
  action: AnyAction;
}

export function useHandleMenuSelect(params: HandleMenuSelectParams) {
  const {history, userId, dispatch, action} = params;
  return useCallback(
    (key: MenuKeyEnum) => {
      switch (key) {
        case MenuKeyEnum.profile:
          history.push('/my/profile');
          break;
        case MenuKeyEnum.passwd:
          history.push(`/my/profile/config/${userId}/edit`);
          break;
        case MenuKeyEnum.logout:
          dispatch(action);
          break;
        default:
          break;
      }
    },
    [dispatch, history, userId, action]
  );
}

export interface GlobalConfig {
  copyright: string;
  menuIcon: string;
  titleText: string;
  titleIcon: string;
}

export function useChangeTitleConfig(globalConfig: GlobalConfig) {
  useEffect(() => {
    if (!globalConfig) return;
    const {titleText, titleIcon} = globalConfig;
    const titleElm = document.querySelector('title') as HTMLTitleElement;
    const iconElm = document.querySelector(
      'link[rel="shortcut icon"]'
    ) as HTMLLinkElement;
    titleElm.innerHTML = titleText;
    iconElm.setAttribute('href', titleIcon);
  }, [globalConfig]);
}
