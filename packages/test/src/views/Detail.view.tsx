import React, {ReactNode} from 'react';
import {Button} from 'antd';
import {DetailTable, Panel} from '@mcfed/components';
import {IRFormState} from '@mcfed/crud';
import {BaseFormViewProps, BaseFormView} from '@user-center/framework';
import {IModel, IReducerState} from '../interface';

export interface FormProps<M extends IModel> extends BaseFormViewProps {
  reducer: IReducerState;
  item: M;
}

interface FormState<M extends IModel> extends IRFormState {
  value: number;
}
export default class DetailView<M extends IModel> extends BaseFormView<
  FormProps<M>,
  FormState<M>
> {
  handleSubmit(value: any): void {
    throw new Error('Method not implemented.');
  }
  componentDidMount(): void {
    const {
      actions,
      match: {params}
    } = this.props;
    actions.fetchItem({id: params.id});
  }

  handleCancel(): void {
    this.goBack();
  }
  renderPanelFooter(): ReactNode {
    const {locale} = this.props;

    return (
      //@ts-ignore
      <Button
        type='primary'
        onClick={this.handleCancel.bind(this, ['handleCancel'])}>
        {locale('GLOBAL.BACK')}
      </Button>
    );
  }
  render(): ReactNode {
    const {item, locale} = this.props;
    const source = [
      {
        label: locale('name.label'),
        value: item.name
      },
      {
        label: locale('title.label'),
        value: item.title
      },
    ];

    return (
      <Panel
        title={locale('GLOBAL.DETAIL')}
        footer={this.renderPanelFooter.bind(this)}>
        <DetailTable
          mode='array'
          title={locale('baseInfo.title')}
          dataSource={source}
          labelKey='label'
          columnNumber={2}
        />
      </Panel>
    );
  }
}
