import ScreenSaver from './screensaver';
import {createSaverMiddleware, saverReducer} from './middleware';
import DefaultLocker from './defaultLock';
import MachineLocker from './machineLock';
import * as types from './interface';

export default ScreenSaver;
export {
  createSaverMiddleware,
  saverReducer,
  types,
  DefaultLocker,
  MachineLocker
};
