import React from 'react';
import {shallow, ShallowRendererProps} from 'enzyme';
import {IRListState} from '@mcfed/crud';
import BaseListView from '../BaseListView';
import {BaseListViewProps} from '../interface';

class TestListView extends BaseListView<BaseListViewProps, IRListState> {
  componentDidMount() {}
  handleFilter() {}
  searchParams() {
    return {};
  }
  render() {
    return 123;
  }
}

function setup(props: any, options?: ShallowRendererProps) {
  const defaultProps = {};
  const wrapper = shallow<TestListView>(
    <TestListView {...Object.assign({}, defaultProps, props)} />,
    options
  );
  return {
    wrapper
  };
}

describe('方法测试全覆盖', () => {
  const props = {};

  it('handleFilter', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: false});
    const instance = wrapper.instance();
    const handleFilterSpy = jest
      .spyOn(instance, 'handleFilter')
      .mockImplementation(() => {});
    const searchParamsSpy = jest
      .spyOn(instance, 'searchParams')
      .mockImplementation(() => ({params: 'test'}));
    instance.onChange({pageSize: 1, current: 2}, null, null);
    expect(searchParamsSpy).toHaveBeenCalled();
    expect(handleFilterSpy).toHaveBeenCalledWith({
      params: 'test',
      page: 2,
      size: 1
    });
  });

  it('mergeTableConfig|空参', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: false});
    const instance = wrapper.instance();
    expect(instance.mergeTableConfig({})).toMatchSnapshot();
  });

  it('mergeTableConfig|存在rowSelection属性', () => {
    const {wrapper} = setup(
      {
        rowSelection: {}
      },
      {disableLifecycleMethods: false}
    );
    const instance = wrapper.instance();
    expect(instance.mergeTableConfig({})).toMatchSnapshot();
  });

  it('mergeTableConfig|返回的showTotal', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: false});
    const instance = wrapper.instance();
    const showTotal = instance.mergeTableConfig({})?.pagination?.showTotal;
    expect(showTotal(15, [11, 15])).toMatchSnapshot();
  });
});
