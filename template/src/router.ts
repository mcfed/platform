import {RouteProps} from 'react-router';

import * as Containers from './container';
function routes(props: RouteProps): Array<RouteProps> {
  const path = props.path as string;
  return [
    {
      path: path,
      exact: true,
      component: Containers.ListContainer
    },
    {
      path: [path, 'add'].join("/"),
      component: Containers.FormContainer
    },
    {
      path: [path, ':id','edit'].join("/"),
      component: Containers.FormContainer
    },
    {
      path: [path, ':id'].join("/"),
      exact: true,
      component: Containers.DetailContainer
    }
  ];
}
export default routes;
