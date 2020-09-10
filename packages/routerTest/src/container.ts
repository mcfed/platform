import {connect} from 'react-redux';
import {Selector, Container, InjectFactory} from '@mcfed/core';
import Action from './action';
import ListView from './views/List.view';
import FormView from './views/Form.view';
import DetailView from './views/Detail.view';
import {namespace} from './model';
import {Dispatch} from 'redux';

const {defaultMergeProps} = Container;
const {
  reducerItemSelector,
  reducerListSelector,
  fetchingSelector,
  reducerSelector,
  appSelector
} = Selector;

export const mapStateToProps = (state: any, props: any) => {
  return {
    appReducer: appSelector(state),
    fetchingReducer: fetchingSelector(state),
    reducer: reducerSelector(state, namespace),
    items: reducerListSelector(state, namespace),
    item: reducerItemSelector(state, namespace, props.match.params.id)
  };
};
export const dispatchToProps = (dispatch: Dispatch, props: object) => {
  return {
    dispatch,
    actions: InjectFactory.ActionFactory(Action, dispatch, namespace)
  };
};
export const ListContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(ListView);
export const FormContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(FormView);
export const DetailContainer = connect(
  mapStateToProps,
  dispatchToProps,
  defaultMergeProps
)(DetailView);
