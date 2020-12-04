import {connect} from 'react-redux';
import {Selector, Container, InjectFactory} from '@mcfed/core';
import Action from './action';
import ListView from './views/List.view';
import FormView from './views/Form.view';
import DetailView from './views/Detail.view';
import {namespace} from './model';
import {Dispatch} from 'redux';
import {IAction, IReducerState, IModel} from './interface';
import { ListProps } from './views/List.view';

const {defaultMergeProps} = Container;
const {
  reducerItemSelector,
  reducerListSelector,
  fetchingSelector,
  reducerSelector,
  appSelector
} = Selector;

export {connect,defaultMergeProps}

export const mapStateToProps = (state: any, props: any) => {
  return {
    appReducer: appSelector(state),
    fetchingReducer: fetchingSelector(state),
    match:{},
    reducer: {},
  };
};
export const dispatchToProps = (dispatch: Dispatch, props: object) => {
  return {
    dispatch,
    actions: InjectFactory.ActionFactory(Action, dispatch, namespace)
  };
};

//@ts-ignore
// @connect(mapStateToProps, dispatchToProps, defaultMergeProps)
// export class ListContainer<T extends IModel> extends ListView<T>{}

export const ListContainer = connect(mapStateToProps, dispatchToProps, defaultMergeProps)(ListView);
export const FormContainer = connect(mapStateToProps, dispatchToProps, defaultMergeProps)(FormView);
export const DetailContainer = connect(mapStateToProps, dispatchToProps, defaultMergeProps)(DetailView);
