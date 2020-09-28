import React, {ReactNode} from 'react';
import {Form, Input} from 'antd';
import {BaseForm, FormItem, Panel} from '@mcfed/components';
import {IRFormState, IParams} from '@mcfed/crud';
import {BaseFormView, BaseFormViewProps} from '@user-center/framework';

import {IAction, IReducerState, IModel} from '../interface';
import {useSelector} from 'react-redux';
import {Selector} from '@mcfed/core';
import {namespace} from '../model';
import Action from '../action';
import {useActions, useFormSubmit} from './useHook';
import {useParams} from 'react-router';

// console.log(useParams)
export interface FormProps<M extends IModel> extends BaseFormViewProps {
  actions: IAction;
  reducer: IReducerState;
  item: M;
  // mode?: Mode;
}

const actions = useActions(Action, namespace);
function locale(type: string) {
  return type;
}

export default function FormView<M extends IModel>() {
  const query = useSelector(Selector.querysSelector);
  const spins = useSelector(Selector.spinsSelector);
  const params: any = useParams();
  const item: any = useSelector(state =>
    Selector.reducerItemSelector(state, namespace, params.id)
  );
  const {handleCancel, handleSubmit, saveFormRef} = useFormSubmit();

  return (
    <Panel
      title={locale('title')}
      // confirmLoading={saveSpin}
      // loading={itemSpin}
      confirmLoading={spins(actions.fetchSave)}
      onOk={handleSubmit}
      onCancel={handleCancel}>
      <Form>
        <FormItem name='id'>
          <Input type='hidden' defaultValue={item.id} />
        </FormItem>
        <FormItem name='name' label='name'>
          <Input defaultValue={item.name} />
        </FormItem>
        <FormItem name='title' label='title'>
          <Input defaultValue={item.title} />
        </FormItem>
      </Form>
    </Panel>
  );
}
