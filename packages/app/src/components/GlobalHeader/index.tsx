import React, {ReactNode, ComponentClass, Fragment} from 'react';
import { Menu, Dropdown, Avatar} from 'antd';

import {ClickParam} from 'antd/lib/menu';
import {BasicProps} from 'antd/lib/layout/layout';
import './style.css';

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
    const {user} = this.props;
    const disabled = user.userOrigin !== 'MC_CENTER';
    return (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key={MenuKeyEnum.profile}>基础资料</Menu.Item>
        <Menu.Item key={MenuKeyEnum.passwd} disabled={disabled}>
          修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={MenuKeyEnum.logout}>退出登录</Menu.Item>
      </Menu>
    );
  }

  handleMenuClick({key}: ClickParam) {
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
