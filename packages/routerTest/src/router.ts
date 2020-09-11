import {RouteProps} from 'react-router';
import {IRoutes} from '@mcfed/router'

import * as Containers from './container';
function routes(props: RouteProps): IRoutes {
  const path = props.path as string;
  return [
    {
      path: path,
      name:"list",
      component: ()=>Containers.ListContainer
    },
    {
      path: [path, 'add'].join('/'),
      name:"add",
      component: ()=>Containers.FormContainer
    },
    {
      path: [path, ':id', 'edit'].join('/'),
      name:"edit",
      component: ()=>Containers.FormContainer
    },
    {
      path: [path, ':id'].join('/'),
      name:"detail",
      component: ()=>Containers.DetailContainer
    }
  ];
}
export default routes({path:'/routertest'});
