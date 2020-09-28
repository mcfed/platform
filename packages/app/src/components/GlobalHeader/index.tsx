import React, {ReactNode, ComponentClass, Fragment} from 'react';
import {Menu, Dropdown, Avatar} from 'antd';

import {BasicProps} from 'antd/lib/layout/layout';
import './style.css';
import SubMenu from 'antd/lib/menu/SubMenu';

export interface GlobalHeaderProps extends BasicProps {
  avator?: ReactNode;
  logo?: ReactNode;
  user?: any;
  onMenuSelect?(key: MenuKeyEnum): void;
}

export enum MenuKeyEnum {
  profile = 'profile',
  passwd = 'passwd',
  logout = 'logout'
}

export class GlobalHeader extends React.Component<GlobalHeaderProps> {
  getMenu() {
    return (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key={MenuKeyEnum.profile}>基础资料</Menu.Item>
        <Menu.Item key={MenuKeyEnum.passwd}>修改密码</Menu.Item>
        <Menu.Divider />
        <SubMenu
          key='sub1'
          title={
            <span>
              <span>切换语言</span>
            </span>
          }>
          <Menu.Item key='zh_CN'>中文</Menu.Item>
          <Menu.Item key='en_US'>English</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <Menu.Item key={MenuKeyEnum.logout}>退出登录</Menu.Item>
      </Menu>
    );
  }

  handleMenuClick({key}: any) {
    const {onMenuSelect} = this.props;
    if (typeof onMenuSelect === 'function') onMenuSelect(key as MenuKeyEnum);
  }

  getLogo() {
    const {logo} = this.props;
    if (!logo) return null;
    if (typeof logo === 'string') return <img alt='logo' src={logo} />;
    return logo;
  }

  render() {
    const {avator, children, className, ...otherProps} = this.props;
    const {logo} = otherProps;
    return (
      <Fragment>
        {logo && <div className='header-logo'>{this.getLogo()}</div>}
        <div className='header-content'>{children}</div>
        <Dropdown
          className='header-icon'
          // overlay={null}
          overlay={this.getMenu()}
          placement='bottomLeft'>
          <Avatar>{avator}</Avatar>
        </Dropdown>
      </Fragment>
    );
  }
}

(GlobalHeader as ComponentClass).defaultProps = {
  avator: 'User'
};
