import {ILocker, IScreenSaver} from './interface';
import confirm from './customConfirm';
import {BaseForm} from '@mcfed/components';
import React from 'react';
import {WrappedFormUtils} from 'antd/lib/form/Form';
import {message} from 'antd';

interface ScreenSaverOption {
  /** 过期时长ms */
  duration: number;
  /** 解锁方式 */
  locker: ILocker;
}

export default class ScreenSaver<V> implements IScreenSaver {
  protected locker: ILocker;
  protected duration: number;
  protected timeout: number = 0;
  protected confirm: any;
  protected form: WrappedFormUtils<V> | undefined;

  constructor(option: ScreenSaverOption) {
    this.locker = option.locker;
    this.duration = option.duration;
  }
  /**
   *
   * @param ref form引用
   */
  protected saveFormRef(ref: any) {
    this.form = ref;
  }
  /**
   * 创建模态框
   * @param callback
   */
  private createModal(callback: Function) {
    return confirm({
      title: 'locker',
      okText: 'unlock',
      onOk: (close, b) => {
        // const values = {a:1}
        this.form?.validateFieldsAndScroll(
          {force: true},
          (err: any, values: any) => {
            if (err) {
              return;
            }
            if (this.locker.handlerOK(values)) {
              this.unLockScreen(callback);
              close();
            } else {
              message.error('解锁验证失败');
            }
          }
        );
      },
      onCancel: () => {
        alert('logout');
      },
      cancelText: 'logout',
      content: React.createElement(
        BaseForm,
        {
          ref: this.saveFormRef.bind(this)
        },
        this.locker.render()
      )
    });
  }

  /**
   * 锁定屏幕
   */
  public lockScreen(callback: Function) {
    const self = this;
    if (!this.confirm) {
      this.confirm = this.createModal(callback);
    }
  }

  /**
   *  计算延时时长
   */
  public calcDelay(): Date {
    return new Date(new Date().getTime() + this.duration);
  }

  /**
   *  延时锁定屏幕
   */
  public delayLock(callback: Function) {
    var self = this;
    clearTimeout(this.timeout);
    //@ts-ignore
    this.timeout = setTimeout(function() {
      self.lockScreen(callback);
    }, this.duration);
    callback();
  }

  /**
   * 检查过期状态
   */

  public checkExpires(expires: Date): Boolean {
    if (expires) {
      return new Date().getTime() >= new Date(expires).getTime();
    } else {
      return false;
    }
  }

  /**
   * 释放锁定状态
   */
  unLockScreen(callback: Function) {
    this.confirm = null;
    // this.locker.unlocker();

    this.delayLock(callback);
  }
}
