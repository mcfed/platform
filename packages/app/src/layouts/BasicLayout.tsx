import React, {useState, useMemo, useContext} from 'react';
import {connect} from 'react-redux';
import {Selector, Container} from '@mcfed/core';
import {Icon, Menu} from 'antd';
import {Link, NavLink} from 'react-router-dom';
import {useLocation, useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {RouterProvider,ReactRoute} from '@mcfed/router';
import {
  AppLayout,
  AppSider,
  AppBreadcrumbs,
  useBreadcrumbRoutes,
  filterActiveRoutes
} from '@mcfed/layout';

import {AppRouter} from '../router';
import {routes} from '../router';
import styles from './BasicLayout.module.css';
import logo from '../assets/logo.png';
import logoMini from '../assets/logo-mini.png';
import {withTokenAuth} from '../router/withTokenAuth';
import {
  useChangeTitleConfig,
  useLogoutAction,
  useHandleMenuSelect
} from './hooks';
import {GlobalHeader} from '../components';
import {RouteItem} from '../interface';
import {computePath} from '../utils';

const {defaultMergeProps} = Container;

const {appSelector} = Selector;

const {Header, Content} = AppLayout;

function itemRender(route: any, params: any, routes: any, paths: any) {
  const last = routes.indexOf(route) === routes.length - 1;
  const first = routes.indexOf(route) === 0;
  return last || first ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
}

export function BasicLayout(props: any) {
  const {dispatch, appReducer} = props;
  const {globalConfig} = appReducer.config;
  const location = useLocation();
  const history = useHistory();
  const {t} = useTranslation();
  const {pathname} = location;
  const {router} = useContext(RouterProvider);
  const {auths, user} = appReducer;
  const userId = user?.id;
  //@ts-ignore
  const activeRoutes = useMemo(() => filterActiveRoutes(routes, auths), [
    auths
  ]);
  const logoutAction = useLogoutAction();
  useChangeTitleConfig(globalConfig);
  const breadcrumbRoutes = useBreadcrumbRoutes(activeRoutes, t, pathname);
  const [icon, setIcon] = useState('menu-fold');
  const handleMenuSelect = useHandleMenuSelect({
    userId,
    dispatch,
    history,
    action: logoutAction
  });

  function onNavChange(menu: any) {
    // dispatch(fetchReset({}));
  }
  function renderMenuItem(currentRoute: RouteItem, parent: RouteItem) {
    return (
      <Menu.Item key={currentRoute.key || currentRoute.path}>
        <NavLink
          to={computePath(parent?.path, currentRoute.path)}>
          {currentRoute.icon && <Icon type={currentRoute.icon} />}
          <span>{t(currentRoute.name)}</span>
        </NavLink>
      </Menu.Item>
    );
  }
  return (
    <AppLayout className={styles['basic-layout']}>
      <AppSider
        menu={activeRoutes}
        locale={t}
        logo={globalConfig?.menuIcon || logo}
        logoHide={globalConfig?.menuIcon || logoMini}
        collapsed={'menu-unfold' === icon ? true : false}
        location={location}
        renderMenuItem={renderMenuItem}
        onCollapse={(collapsed: boolean) => {
          collapsed ? setIcon('menu-unfold') : setIcon('menu-fold');
        }}
        onSelect={onNavChange}
        trigger={<Icon type={icon} />}
      />
      <AppLayout>
        <Header className={styles['basic-layout-header']}>
          <GlobalHeader
            user={user}
            onMenuSelect={handleMenuSelect}></GlobalHeader>
        </Header>
        <AppBreadcrumbs
          breadcrumbRoutes={breadcrumbRoutes}
          itemRender={itemRender}></AppBreadcrumbs>
        <Content
          className={[styles['basic-layout-content'], 'base-layout-main'].join(
            ' '
          )}>
          <ReactRoute />
        </Content>
      </AppLayout>
    </AppLayout>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return {
    appReducer: appSelector(state)
  };
};

const dispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    actions: {}
  };
};

const BasicLayoutContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(withTokenAuth(BasicLayout));

export default BasicLayoutContainer;
