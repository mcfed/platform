import React, {Fragment} from 'react';
import {RouteProps, Switch, Route} from 'react-router';
import i18n from '../locales/i18n';

interface ModuleRoute extends RouteProps {
  mode?: 'modal' | 'view';
  key?: string;
}

export function renderModuleRoutes(
  routes: ModuleRoute[],
  useSwitch = true
): JSX.Element | null {
  if (!Array.isArray(routes)) return null;
  const routeArr = routes.map((route, i) => (
    <Route
      key={route.key || i}
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={props =>
        route.render ? (
          //@ts-ignore
          route.render({...props, i18n: i18n, route: route, mode: route.mode})
        ) : (
          //@ts-ignore
          <route.component
            {...props}
            i18n={i18n}
            route={route}
            mode={route.mode}
          />
        )
      }
    />
  ));
  return useSwitch ? (
    <Switch>{routeArr}</Switch>
  ) : (
    <Fragment>{routeArr}</Fragment>
  );
}
