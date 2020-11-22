import {ILocker, IScreenSaver} from './interface';

interface ScreenSaverOption {
  /** 过期时长ms */
  duration: number;
  /** 解锁方式 */
  locker: ILocker;
}

export default class ScreenSaver implements IScreenSaver {
  protected locker: ILocker;
  protected duration: number;
  protected timeout: number = 0;

  constructor(option: ScreenSaverOption) {
    this.locker = option.locker;
    this.duration = option.duration;
  }

  /**
   * 锁定屏幕
   */
  public lockScreen() {
    this.locker.locked();
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
  public delayLock() {
    var self = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      self.lockScreen();
    });
  }

  /**
   * 检查过期状态
   */

  public checkExpires(expires: Date): Boolean {
    return new Date().getTime() >= expires.getTime();
  }

  /**
   * 释放锁定状态
   */
  unLockScreen() {
    this.locker.unlocker();
    this.delayLock();
  }
}
