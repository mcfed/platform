import {ILocker} from './interface';
import React from 'react';
import Input from 'antd/lib/input';
import {FormItem} from '@mcfed/components';

interface IDefaultLocker {
  a: String;
}

export default class DefaultLocker<T extends IDefaultLocker>
  implements ILocker {
  handlerOK(value: T): boolean {
    // throw new Error('Method not implemented.');
    // console.log(value)
    return value.a == '1';
  }
  handlerCancel(value: T): boolean {
    // throw new Error('Method not implemented.');
    return true;
  }
  render() {
    return (
      <FormItem name='a' label='请输入密码'>
        <Input
          placeholder='entery password'
          type='password'
          addonAfter={'密码：1'}></Input>
      </FormItem>
    );
  }
}
