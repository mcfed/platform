import React from 'react';
import Loadable from 'react-loadable';
import {RouterConfig} from '../interface';
import store from '../store';
import {renderModuleRoutes} from '../components/render-module-routes';

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
    component: () => <div>1111</div>
    // component: loadableMoudle(import('@platform/demo5'))
  }
];
