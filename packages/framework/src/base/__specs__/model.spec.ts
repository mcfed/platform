import {ORMModel} from '@mcfed/core';
import BaseModel from '../model';

//@ts-ignore
BaseModel.modelName = 'BaseModel';
//@ts-ignore
const orm = new ORMModel.ModelORM();
//@ts-ignore
orm.register(BaseModel);

describe('BaseModel unit test', () => {
  let session: any;
  beforeEach(() => {
    //@ts-ignore
    const emptyDBstate = orm.getEmptyState();
    //@ts-ignore
    session = orm.session({
      ...emptyDBstate
    });
  });

  it('newItem', () => {
    const {newItem} = BaseModel.reducers;
    const createSpye = jest.spyOn(session.BaseModel, 'create');
    newItem(
      {
        type: 'test',
        payload: {
          id: 'test'
        }
      },
      session.BaseModel
    );
    expect(createSpye).toHaveBeenCalledWith({id: 'test'});
  });

  it('savePage', () => {
    const {savePage, newItem} = BaseModel.reducers;
    newItem(
      {
        type: 'test',
        payload: {
          id: 'test'
        }
      },
      session.BaseModel
    );
    const createSpye = jest.spyOn(session.BaseModel, 'create');
    const deleteSpy = jest.spyOn(session.BaseModel.prototype, 'delete');
    savePage(
      {
        type: 'test',
        payload: {
          list: [
            {
              id: 'test'
            }
          ]
        }
      },
      session.BaseModel
    );
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(createSpye).toHaveBeenCalledWith({id: 'test'});
  });
});
