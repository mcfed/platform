import React from 'react';
import {shallow} from 'enzyme';
import List from '../views/List.view';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
jest.mock('react-router', () => {
  // Works and lets you check for constructor calls:
  // return jest.fn().mockImplementation(() => {
  return {
    useParams: () => {}
  };
  // });
});

jest.mock('react-redux', () => {
  return {
    useSelector: () => {}
  };
});

function setup(props, options) {
  const defaultProps = {};
  const wrapper = shallow(
    <List {...Object.assign({}, defaultProps, props)} />,
    options
  );
  return {
    wrapper
  };
}

describe('快照测试', () => {
  const props = {
    items: []
  };
  it('详情页全页快照', () => {
    const {wrapper} = setup(props, {});

    expect(wrapper).toMatchSnapshot();
  });
});
