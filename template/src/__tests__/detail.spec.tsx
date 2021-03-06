import React from 'react';
import {shallow} from 'enzyme';
import Detail from '../views/Detail.view';
import {IModel} from '../interface';

function setup(props: any, options?: any) {
  const defaultProps = {
    item: {},
    items: [],
    actions: {
      fetchItem: jest.fn()
    },
    querys: jest.fn(),
    spins: jest.fn(),
    dicts: jest.fn(),
    locale: jest.fn().mockImplementation(name => name),
    match: {
      params: {}
    },
    history: {
      push: jest.fn()
    },
    reducer: {
      config: {},
      pwdConfig: {}
    }
  };
  const wrapper = shallow<Detail<IModel>>(
    <Detail {...Object.assign({}, defaultProps, props)} />,
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
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  const props = {};

  it('handleCancel', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    const goBackSpy = jest
      .spyOn(instance, 'goBack')
      .mockImplementation(() => {});
    instance.handleCancel();
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('renderPanelFooter', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    expect(instance.renderPanelFooter()).toMatchSnapshot();
  });
});
