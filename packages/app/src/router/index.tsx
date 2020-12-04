import React from 'react';
import Loadable from 'react-loadable';
import {RouterConfig} from '../interface';
import store from '../store';
import {renderModuleRoutes} from '../components/render-module-routes';
import { IRoute, IRoutes } from '@mcfed/router';
import { container } from '@platform/test';

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

export const routes: IRoutes= [
  {
    path: 'dashboard',
    icon: 'team',
    name: 'MENU.DASHBOARD',
    component: () => <div>@platfrom</div>
  },
  {
    path: "test",
    icon: "team", 
    name: "test", 
    component: ()=><div>test</div>
  },
  {
    path:'/testimport',
    icon: "team", 
    name:'testimport',
    component:()=>loadableMoudle(import('@platform/test'))
  }
];

export const routeConfig: IRoute= {
  path:'',
  children:[
    {
      path: '/dashboard',
      name: 'MENU.DASHBOARD',
      component: () => <div>@platfrom</div>
    },
    {
      path: "/test",
      name: "test", 
      component: ()=>container.ListContainer
    },
    {
      path:'/testimport',
      name:'testimport',
      component:()=>loadableMoudle(import('@platform/test'))
    }
  ]
};

// export const routeConfig: IRoutes= [
//   {
//     path: '/dashboard',
//     name: 'MENU.DASHBOARD',
//     component: () => <div>@platfrom</div>
//   },
//   {
//     path: "/test",
//     name: "test", 
//     component: ()=><div>test</div>
//   }
// ];
