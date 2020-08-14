import React, {ReactNode} from 'react';
import {Input} from 'antd';
import {BaseForm, FormItem, Panel} from '@mcfed/components';
import {IRFormState, IParams} from '@mcfed/crud';
import {BaseFormView, BaseFormViewProps} from '@user-center/framework';

import {IAction, IReducerState, IModel} from '../interface';

export interface FormProps<M extends IModel> extends BaseFormViewProps {
  actions: IAction;
  reducer: IReducerState;
  item: M;
  mode?: Mode;
}

interface FormState<M extends IModel> extends IRFormState {
  value: number;
}

export default class FormView<M extends IModel> extends BaseFormView<
  FormProps<M>,
  FormState<M>
> {
  componentDidMount(): void {
    const {actions} = this.props;
    const params: IParams<M> = this.props.match.params;
    if (params.id) {
      actions.fetchItem(params.id);
    }
  }

  handleSubmit(values: Object): void {
    const {actions} = this.props;
    // this.state.value

    actions.fetchSave(values);
  }
  handleCancel(): void {
    this.goBack();
  }

  render(): ReactNode {
    const {item, actions, locale, spins, mode} = this.props;
    // const saveSpin = spins(actions.fetchSave);
    // const itemSpin = spins(actions.fetchItem);
    return (
      <Panel
        title={locale('title')}
        mode={mode}
        // confirmLoading={saveSpin}
        // loading={itemSpin}
        confirmLoading={spins(actions.fetchSave)}
        onOk={this.onSubmit.bind(this, 'handleSubmit')}
        onCancel={this.handleCancel.bind(this, 'handleCancel')}>
        <BaseForm ref={this.saveFormRef.bind(this)}>
          <FormItem name='id'>
            <Input type='hidden' defaultValue={item.id} />
          </FormItem>
          {@#columns@}
          <FormItem name='{@name@}' label='{@name@}'>
            <Input defaultValue={item.name} />
          </FormItem>
          {@/columns@}
        </BaseForm>
      </Panel>
    );
  }
}
