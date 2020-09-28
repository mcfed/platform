import React, {useEffect, useCallback} from 'react';
import {Input} from 'antd';
import {ButtonGroups, DataTable, Panel} from '@mcfed/components';
import {IModel, IParams, IReducerState} from '../interface';
import {useSelector} from 'react-redux';
import {Selector, InjectFactory} from '@mcfed/core';
import {
  useRowsState,
  usePaginationHandler,
  useMergeTableConfig,
  useActions,
  useHandler
} from './useHook';
import {useParams} from 'react-router';
import {namespace} from '../model';
import Action from '../action';

const Button = ButtonGroups.CustomButton;
export interface ListProps<M> {
  locale: Function;
}
const actions = useActions(Action, namespace);

function locale(type: string) {
  return type;
}

function useHandleFilter({actions}: any) {
  const params = useParams();
  return useCallback(
    (value?: object) => {
      actions.fetchPage(Object.assign({}, value));
    },
    [params]
  );
}

function ListSearch<M extends IModel>(props: ListProps<M>): JSX.Element {
  const params = useParams();
  const querys = useSelector(Selector.querysSelector);
  const handleFilter = useHandleFilter({params, actions});
  const query: IParams<M> = Object.assign({}, {});
  // const t =
  return <div>searchForm</div>;
}

function ListToolbar<M extends IModel>(props: ListProps<M>): JSX.Element {
  // const { locale } = props;
  const spins = useSelector(Selector.spinsSelector);
  const {selectedRowKeys} = useRowsState();
  const handler = useHandler(actions, selectedRowKeys);

  return (
    <ButtonGroups handleClick={handler}>
      <Button actionkey='add' type='primary'>
        {locale('GLOBAL.NEW')}
      </Button>
      <Button actionkey='delete' loading={false}>
        {locale('GLOBAL.REMOVE')}
      </Button>
    </ButtonGroups>
  );
}

function ListDataTable<M extends IModel>(props: ListProps<M>): JSX.Element {
  // const { locale } = props;
  const {page}: IReducerState = useSelector(state =>
    Selector.reducerSelector(state, namespace)
  );
  const items: M[] = useSelector(state =>
    Selector.reducerListSelector(state, namespace)
  );
  const querys = useSelector(Selector.querysSelector);
  const {selectedRowKeys, onSelectChange} = useRowsState();
  const handleFilter = useHandleFilter(actions);

  const queryParams = {};
  const onChange = usePaginationHandler(handleFilter, queryParams);
  const tableConf: any = {
    rowKey: 'id',
    dataSource: items,
    columns: [
      {
        title: locale('name.label'),
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: locale('title.label'),
        key: 'title',
        dataIndex: 'title'
      },
      {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: 'options',
        dataIndex: 'options',
        width: 190
        // render: this.renderTableButtonGroups.bind(this)
      }
    ]
  };
  const tableConfig = useMergeTableConfig({
    tableConf,
    selectedRowKeys,
    onSelectChange,
    page,
    onChange
  });

  return <DataTable {...tableConfig} />;
}

export default function ListView<M extends IModel>(props: ListProps<M>) {
  // const {actions,match} = props
  const params = useParams();
  const handleFilter = useHandleFilter({params, actions});
  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <Panel footer={false}>
      <ListSearch {...props}></ListSearch>
      <ListToolbar {...props}></ListToolbar>
      <ListDataTable {...props}></ListDataTable>
    </Panel>
  );
}
