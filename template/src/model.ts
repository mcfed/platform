import {ORMModel} from '@mcfed/core';
import {BaseModel} from '@user-center/framework';
import {IModel} from './interface';

const {attr, pk} = ORMModel;

export const namespace = '{@namespace@}';

export default class  {@namespace@} extends BaseModel implements IModel {
  constructor(props: IModel) {
    super(props);
    this.initFields(props);
  }
  static modelName: string = namespace;

  @pk()
  id!: number;
  {@#tableData@}
  @attr()
  {@dataIndex@}?: {@dataType@};
  {@/tableData@}

  getName() {}
}
