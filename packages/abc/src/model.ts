import {ORMModel} from '@mcfed/core';
import {BaseModel} from '@user-center/framework';
import {IModel} from './interface';

const {attr, pk} = ORMModel;

export const namespace = 'test';

export default class test extends BaseModel implements IModel {
  constructor(props: IModel) {
    super(props);
    this.initFields(props);
  }
  static modelName: string = namespace;

  @pk()
  id!: number;
  @attr()
  name!: string;
  @attr()
  title!: string;

  getName() {}
}
