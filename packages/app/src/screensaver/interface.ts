export interface IScreenSaver {
  checkExpires(date: Date): Boolean;
  lockScreen(): void;
  delayLock(): void;
  calcDelay(): Date;
}

export interface ILocker {
  locked(): void;
  verify(): void;
  unlocker(): void;
  render(): any;
}
