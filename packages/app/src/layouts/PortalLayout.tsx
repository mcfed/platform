import React from 'react';
import classnames from 'classnames';
import {Dispatch} from 'redux';
import {History} from 'history';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {Selector, Container} from '@mcfed/core';
import {AppLayout} from '@mcfed/layout';

import logo from '../assets/logo.png';
import styles from './PortalLayout.module.css';
import {
  useHandleMenuSelect,
  useLogoutAction,
  useChangeTitleConfig
} from './hooks';
import {withTokenAuth} from '../router/withTokenAuth';

const {defaultMergeProps} = Container;
const {appSelector} = Selector;
const {Header, Content} = AppLayout;

interface UserApp {
  appIcon?: string;
  appIndex?: string;
  appName?: string;
  id?: number;
  isAuth?: boolean;
}

interface PortalLayoutProps {
  appReducer: any;
  dispatch: Dispatch;
  history: History;
}

export function PortalLayout(props: PortalLayoutProps) {
  const {appReducer, dispatch, history} = props;
  const {globalConfig} = appReducer.config;
  const {user} = appReducer;
  const userId = user?.id;
  const logoutAction = useLogoutAction();
  const handleMenuSelect = useHandleMenuSelect({
    userId,
    dispatch,
    history,
    action: logoutAction
  });
  useChangeTitleConfig(globalConfig);
  return (
    <Layout>
      <Content className={styles['portal-content']}></Content>
    </Layout>
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

const PortalLayoutContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(withTokenAuth(PortalLayout));

export default PortalLayoutContainer;
