import React from 'react';
import Loadable from 'react-loadable';
import {RouterConfig} from '../interface';
import store from '../store';
import {renderModuleRoutes} from '../components/render-module-routes';
// @ts-ignore
import {LoginForm} from '@user-center/login';

export * from './AppRouter';

/**
 * 动态导入模块
 * @param importModule
 */
function loadableMoudle(importModule: any) {
  return Loadable({
    loader: () =>
      new Promise((resolve: any, rejects) => {
        store.importRouterModule(importModule).then(view => {
          resolve((props: any) => renderModuleRoutes(view(props), false));
        });
      }),
    //@ts-ignore
    loading: () => 'loading'
  });
}

export const routes: RouterConfig<any, string> = [
  {
    path: 'dashboard',
    icon: 'team',
    name: 'MENU.DASHBOARD',
    component: () => <div>@platfrom</div>
  }
  // {
  //   path: 'logincontainer',
  //   icon: 'team',
  //   name: 'MENU.LOGINCONTAINER',
  //   component: loadableMoudle(import('@user-center/login'))
  // },
  // {
  //   path: 'loginview',
  //   icon: 'team',
  //   name: 'MENU.LOGINVIEW',
  //   component: ()=> <LoginForm loginConfig={{}}></LoginForm>
  // }
];
