import {useCallback, useState, useMemo} from 'react';
import {useHistory, useParams, useRouteMatch} from 'react-router';
import {IAction} from '../interface';
import {InjectFactory} from '@mcfed/core';
import {useDispatch} from 'react-redux';
import {Constructor} from '@mcfed/core/dist/InjectFactory';

export function useFormSubmit() {
  const handleSubmit = useCallback((selectedRowKeys, selectedRows) => {
    // setSelectedRows(selectedRows);
    // setSelectedRowKeys(selectedRowKeys);
  }, []);
  /**
   * 清理行选状态
   */
  const handleCancel = useCallback(() => {}, []);
  const saveFormRef = useCallback(() => {}, []);
  return {
    handleSubmit,
    handleCancel,
    saveFormRef
  };
}

/**
 * 页信息变化监听
 * @param handleFilter 查询方法
 * @param params 额外查询参数
 */
export function usePaginationHandler(handleFilter: any, params: any) {
  const {searchParams} = params;
  // const handleFilter = useHandleFilter(actions)
  return useCallback(
    (pagination: any, filters: any, sorter: any) => {
      const {current, pageSize} = pagination;
      var object = Object.assign(
        {},
        searchParams,
        {page: current, size: pageSize},
        filters,
        sorter
      );
      handleFilter(object);
    },
    [searchParams]
  );
}

/**
 * 合并表格默认参数配置
 * @param param0
 */

export function useMergeTableConfig({
  tableConf,
  onChange,
  onSelectChange,
  selectedRowKeys
}: any) {
  return useMemo(() => {
    return Object.assign(
      {
        size: 'middle',
        onChange: onChange,
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          size: 'small',
          showTotal: (total: number, range: number[]) =>
            `共 ${total} 条，当前第 ${range[0]} 至 第 ${range[1]} 条`
        },
        style: {
          width: '100%'
        }
      },
      tableConf,
      tableConf?.rowSelection === null
        ? {}
        : {
            rowSelection: {
              onChange: onSelectChange,
              selectedRowKeys: selectedRowKeys,
              ...tableConf.rowSelection
            }
          }
    );
  }, []);
}

/**
 * 行选状态管理
 */

export function useRowsState() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  /**
   * 行选监听方法
   */
  const onSelectChange = useCallback((selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  }, []);
  /**
   * 清理行选状态
   */
  const cleanSelectedRows = useCallback(() => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  }, []);
  return {
    selectedRows,
    selectedRowKeys,
    setSelectedRows,
    setSelectedRowKeys,
    onSelectChange,
    cleanSelectedRows
  };
}

/**
 * 创建actions方法
 * @param Action
 * @param namespace
 */

export function useActions<T>(Action: Constructor<T>, namespace: string) {
  //   const dispatch = useDispatch()
  //@ts-ignore
  return InjectFactory.ActionFactory(Action, function() {}, namespace);
}

/**
 * 导航跳转
 */

export function useNav() {
  const history = useHistory();
  return {
    goAdd: function() {
      history.push('add');
    },
    goEdit: function(id: string | string[]) {
      history.push(`edit/:id`);
    },
    goDetail: function(id: string | string[]) {
      history.push(`:id`);
    },
    goBack: function() {
      history.goBack();
    }
  };
}

/**
 * 事件监听器
 * @param action
 * @param rowkeys
 */

export function useHandler(action: IAction, rowkeys: string | string[]) {
  // const {actions} = this.props;
  const {setSelectedRowKeys, setSelectedRows} = useRowsState();
  return useCallback(
    (actionType: string) => {
      const {goAdd, goEdit, goDetail} = useNav();
      if (actionType === 'add') {
        goAdd();
      } else if (actionType === 'edit') {
        goEdit(rowkeys);
      } else if (actionType === 'detail') {
        goDetail(rowkeys);
      } else if (actionType === 'delete') {
        action.fetchDelete(rowkeys);
      }
      setSelectedRowKeys([]);
      setSelectedRows([]);
    },
    [rowkeys]
  );
}
