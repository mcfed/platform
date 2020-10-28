import React, {ReactNode} from 'react';
import {
  ButtonGroups,
  HeadSearchBar,
  DataTable,
  Panel,
  FormItem
} from '@mcfed/components';
import {IRListState, IParams, PK} from '@mcfed/crud';
import {TableProps} from 'antd/lib/table/interface';
import {BaseListView, BaseListViewProps} from '@user-center/framework';
import {IAction, IReducerState, IModel} from '../interface';
{@#importData@}
  {@&text@}
{@/importData@}

const Button = ButtonGroups.CustomButton;
export interface ListProps<M> extends BaseListViewProps {
  actions: IAction;
  reducer: IReducerState;
  items: M[];
  item: M;
}

interface ListState<M> extends IRListState {}

export default class ListView<M extends IModel> extends BaseListView<
  ListProps<M>,
  ListState<M>
> {
  componentDidMount(): void {
    this.handleFilter(this.searchParams());
  }
  handleFilter(value: Object) {
    const {
      actions,
      match: {params}
    } = this.props;
    actions.fetchPage(Object.assign({}, value, params));
  }
  searchParams(): object {
    const {actions, querys} = this.props;
    const defaultParams: Object = {};

    return Object.assign(defaultParams, querys(actions.fetchPage));
  }
  handlerMenu(rowkeys: PK | PK[], actionType: string): void {
    const {actions} = this.props;
    if (actionType === 'add') {
      this.goAdd();
    } else if (actionType === 'edit') {
      this.goEdit(rowkeys as PK);
    } else if (actionType === 'detail') {
      this.goDetail(rowkeys as PK);
    } else if (actionType === 'delete') {
      actions.fetchDelete(rowkeys);
    }
    this.clearSelectRows();
  }
  renderOptionItem(item: {label: string; value: string}, idx: PK): ReactNode {
    return (
      <Select.Option key={idx} value={item.value}>
        {item.label}
      </Select.Option>
    );
  }
  renderSearchForm(): ReactNode {
    // const { actions, spins, locale } = this.props;
    const query: IParams<M> = this.searchParams();
    return (
      <HeadSearchBar
        showSearchButton={false}
        filterSubmitHandler={this.handleFilter.bind(this)}>
        {@#transformTypetoComponentData.listData@}
          <FormItem name={'{@name@}'}>
            {@&commponent@}
          </FormItem>
        {@/transformTypetoComponentData.listData@}
      </HeadSearchBar>
    );
  }
  

  renderToolbar(): ReactNode {
    const {selectedRowKeys} = this.state;
    const {actions, locale, spins} = this.props;
    return (
      <ButtonGroups
        handleClick={(actionType: string) =>
          this.handlerMenu(selectedRowKeys, actionType)
        }>
        {@#buttonData@}
          <Button actionkey='{@actionKey@}' type='{@type@}'>
            {@name@}
          </Button>
        {@/buttonData@}
      </ButtonGroups>
    );
  }
  renderTableButtonGroups(text: string, row: M): ReactNode {
    const {locale} = this.props;
    return (
      <ButtonGroups
        handleClick={(actionType: string) =>
          this.handlerMenu(row.id.toString(), actionType)
        }>
        <Button actionkey='edit'>{locale('GLOBAL.MODIFY')}</Button>
        <Button actionkey='detail'>{locale('GLOBAL.DETAIL')}</Button>
        <Button actionkey='delete'>{locale('GLOBAL.REMOVE')}</Button>
      </ButtonGroups>
    );
  }
  renderDataTable(): ReactNode {
    const {reducer, items, locale} = this.props;
    let tableConf: TableProps<M> = {
      rowKey: 'id',
      dataSource: items,
      columns: [
        {@#arrayItemToStringData.tableData@}
            {@&.@},
        {@/arrayItemToStringData.tableData@}
          {
              title: locale('GLOBAL.COLUMNS.OPTIONS'),
              key: 'options',
              dataIndex: 'options',
              width: 190,
              render: this.renderTableButtonGroups.bind(this)
          }
      ]
    };

    return (
      <DataTable
        {...this.mergeTableConfig(tableConf)}
        rowSelection={null}
        page={reducer.page}
      />
    );
  }
  
  render(): ReactNode {
    return (
      <Panel footer={false}>
        {this.renderSearchForm()}
        {this.renderToolbar()}
        {this.renderDataTable()}
      </Panel>
    );
  }
}
