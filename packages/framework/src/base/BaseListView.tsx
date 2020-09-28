import React from 'react';
import {IRListState, IParams, PK, RListPage} from '@mcfed/crud';
import {BaseListViewProps} from './interface';
//@ts-ignore
import {TableProps, PaginationConfig} from 'antd/lib/table';
// import styles from '../styles/style.module.css'

export default abstract class BaseListView<
  P extends BaseListViewProps,
  S extends IRListState
> extends RListPage<P, S> {
  abstract searchParams(): IParams<any>;
  abstract handleFilter(value: any): void;
  abstract componentDidMount(): void;
  abstract render(): React.ReactNode;
  onChange(pagination: PaginationConfig, filters: any, sorter: any) {
    const {current, pageSize} = pagination;
    var object = Object.assign(
      {},
      this.searchParams(),
      {page: current, size: pageSize},
      filters,
      sorter
    );
    this.handleFilter(object);
  }
  renderSearchBar() {
    return <div>sdfsfs</div>;
  }
  mergeTableConfig(config: TableProps<any>) {
    return Object.assign(
      {
        size: 'middle',
        onChange: this.onChange.bind(this),
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          size: 'small',
          showTotal: (total: number, range: number[]) =>
            `共 ${total} 条，当前第 ${range[0]} 至 第 ${range[1]} 条`
        }
      },
      config,
      config?.rowSelection === null
        ? {}
        : {
            rowSelection: {
              onChange: this.onSelectChange?.bind(this),
              selectedRowKeys: this.state.selectedRowKeys,
              ...config.rowSelection
            }
          }
    );
  }
}
