import React, {useCallback, useMemo, FunctionComponent} from 'react';
import {Switch, Route, useLocation, Redirect} from 'react-router';
import {RouterConfig} from '../interface';
import { computePath } from '../utils';

interface AppRouterProps {
  routerConfig: RouterConfig;
  parentPath?: string;
}

function useMapRoutes(pathname: string) {
  const mapRoutes = useCallback(
    (route: RouterConfig, parentPath = '') => {
      return route.map((r: any) => {
        const path = computePath(parentPath, r.path);
        if (pathname.indexOf(path) > -1) {
          return (
            <Route key={path} {...r} path={path}>
              {r.routes ? mapRoutes(r.routes, path) : undefined}
            </Route>
          );
        } else {
          return null;
        }
      });
    },
    [pathname]
  );
  return mapRoutes;
}

export function AppRouter(props: AppRouterProps) {
  const {routerConfig, parentPath} = props;
  const location = useLocation();
  const mapRoutes = useMapRoutes(location.pathname);
  const routes = useMemo(() => mapRoutes(routerConfig, parentPath), [
    mapRoutes,
    routerConfig,
    parentPath
  ]);
  return (
    <Switch>
      {routes}
      <Route
        path={computePath(parentPath || '', '404')}
        component={() => <div>404</div>}
      />
      <Redirect to={computePath(parentPath || '', '404')} />
    </Switch>
  );
}

(AppRouter as FunctionComponent<AppRouterProps>).defaultProps = {
  parentPath: ''
};
