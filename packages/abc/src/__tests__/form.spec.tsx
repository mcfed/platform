import React from 'react';
import {shallow} from 'enzyme';
import Form from '../views/Form.view';
import {IModel} from '../interface';

jest.mock('react-router', () => {
  // Works and lets you check for constructor calls:
  // return jest.fn().mockImplementation(() => {
  return {
    useParams: jest
      .fn()
      .mockImplementation(() => {
        a: 1;
      })
      .mockImplementation(() => {
        b: 2;
      })
  };
  // });
});

jest.mock('react-redux', () => {
  return {
    useSelector: () => {}
  };
});

function setup(props: any, options?: any) {
  const defaultProps = {};
  const wrapper = shallow(
    <Form {...Object.assign({}, defaultProps, props)} />,
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
    // const instance = wrapper.instance();
    // const goBackSpy = jest
    //   .spyOn(instance, 'goBack')
    //   .mockImplementation(() => {});
    // instance.handleCancel();
    // expect(goBackSpy).toHaveBeenCalled();
  });
});
