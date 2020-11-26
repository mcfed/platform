import {ILocker} from './interface';
import React from 'react';
import Input from 'antd/lib/input';
import {FormItem} from '@mcfed/components';

interface IMachineLocker {
  sum: Number;
}

export default class MachineLocker<T extends IMachineLocker>
  implements ILocker {
  handlerOK(value: T): boolean {
    // throw new Error('Method not implemented.');
    // console.log(value)
    return value.sum == 6;
  }
  handlerCancel(value: T): boolean {
    // throw new Error('Method not implemented.');
    return true;
  }
  render() {
    return (
      <FormItem name='sum'>
        <Input
          placeholder='entery value'
          type='text'
          addonAfter={'3+3=?'}></Input>
      </FormItem>
    );
  }
}
