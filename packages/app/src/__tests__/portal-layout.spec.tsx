import React from 'react';
import {shallow, ShallowRendererProps} from 'enzyme';

import {PortalLayout} from '../layouts/PortalLayout';
import {HashRouter} from 'react-router-dom';

jest.mock('../router', () => ({
  routes: []
}));

function setup(props: any, options?: ShallowRendererProps) {
  const defaultProps = {
    match: {
      path: '/test'
    },
    appReducer: {
      config: {
        apps: [{isAuth: true}, {isAuth: false}]
      }
    },
    dispatch: jest.fn(),
    locale: jest.fn().mockImplementation(name => name)
  };
  const wrapper = shallow<typeof PortalLayout>(
    <PortalLayout {...Object.assign({}, defaultProps, props)} />,
    options
  );
  return {
    wrapper
  };
}
it('快照测试', () => {
  const {wrapper} = setup({});

  expect(wrapper).toMatchSnapshot();
});
