import {ORMModel} from '@mcfed/core';
import {SessionBoundModel} from '@mcfed/core/dist/model/index';
import {AnyAction} from 'redux';

const BaseModel = ORMModel.BaseModel;

export default class NBaseModel extends BaseModel {
  constructor(props: any) {
    super(props);
    this.initFields(props);
  }

  static reducers = {
    newItem: (action: AnyAction, modelClass: any) => {
      modelClass.create(action.payload);
    },
    savePage: (action: AnyAction, modelClass: any) => {
      modelClass
        .all()
        .toModelArray()
        .forEach((model: SessionBoundModel) => model.delete());
      action.payload?.list?.map((m: SessionBoundModel) => modelClass.create(m));
    },
    saveList: (action: AnyAction, modelClass: any) => {
      action.payload?.list?.map((m: SessionBoundModel) => modelClass.create(m));
    },
    updateItem: (action: AnyAction, modelClass: any) => {
      modelClass.withId(action.payload?.id).update(action.payload);
    },
    saveItem: (action: AnyAction, modelClass: any) => {
      modelClass.upsert(action.payload);
    },
    deleteItem: (action: AnyAction, modelClass: any) => {
      const model = modelClass.withId(action.payload);
      model.delete();
    }
  };
}
