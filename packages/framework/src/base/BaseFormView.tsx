import React from 'react';
import {IRFormState, RFormPage} from '@mcfed/crud';
import {BaseFormViewProps} from './interface';

export default abstract class BaseFormView<
  P extends BaseFormViewProps,
  S extends IRFormState
> extends RFormPage<P, S> {
  abstract handleSubmit(value: any): any;
  abstract componentDidMount(): void;
  abstract render(): React.ReactNode;
}
