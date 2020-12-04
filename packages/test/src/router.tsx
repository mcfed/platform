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
      component: Containers.DetailContainer
    }
  ];
}
export default routes;

// function routes(props: RouteProps) {
//   const path = props.path as string;
//   return (<Fragment>
//     <Route path={`${path}`} exact={true} component={Containers.ListContainer}/>
//     <Switch>
//     <Route path={`${path}/add`}  component={Containers.FormContainer} />
//       <Route path={`${path}/:id/edit`} component={Containers.FormContainer} />
//       <Route path={`${path}/:id`} component={Containers.DetailContainer} />
//     </Switch>
//   </Fragment>)
// }
