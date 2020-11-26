export interface IScreenSaver {
  checkExpires(date: Date): Boolean;
  lockScreen(callback: Function): void;
  delayLock(callback: Function): void;
  calcDelay(): Date;
}

export interface ILocker {
  handlerOK(value: any): boolean;
  handlerCancel(value: any): boolean;
  render(): any;
}
