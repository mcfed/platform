import ScreenSaver, {createSaverMiddleware} from '.';
import {ILocker} from './interface';

export class MessageLocker implements ILocker {
  locked(): void {
    this.render();
    // console.log("lock screen");
  }
  verify(): void {
    console.log('send fetch verify');
    console.log('unlocker');
  }
  unlocker(): void {
    this.verify();
  }
  render() {
    console.log('i am locked');
    return null;
  }
}

/**
 * 
 * const saver = new ScreenSaver({locker:new MessageLocker(),duration:8*60*60*1000})
   createSaverMiddleware(saver) 
 *  
 * 
 */
