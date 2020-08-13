import {RouteProps} from 'react-router';
import {computePath} from '@user-center/utils';

import * as Containers from './container';
function routes(props: RouteProps): Array<RouteProps> {
  const path = props.path as string;
  return [
    {
      path: computePath(path),
      exact: true,
      component: Containers.ListContainer
    },
    {
      path: computePath(path, 'add'),
      component: Containers.FormContainer
    },
    {
      path: computePath(path, ':id/edit'),
      component: Containers.FormContainer
    },
    {
      path: computePath(path, ':id'),
      component: Containers.DetailContainer
    }
  ];
}
export default routes;
