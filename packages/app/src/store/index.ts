import {createLogger} from 'redux-logger';
import {StoreManager, Middleware} from '@mcfed/core';
import {messageMiddleware} from './redux-message';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {Dispatch, combineReducers, CombinedState} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
//@ts-ignore
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
// import ScreenSaver, {
//   saverReducer,
//   createSaverMiddleware,
//   DefaultLocker,
//   MachineLocker
// } from '../screensaver';
// import {history} from '../router'
import {createRouter} from './redux-router';
import {createHashHistory} from 'history';
// import {fetchingMiddleware} from '@mcfed/core/dist/middleware';
// import {upgradeConfig} from '@mcfed/core/dist/middleware/redux-module';

const {passportMiddleware} = Middleware;

const history = createHashHistory();
const createPassport = passportMiddleware.default({
  loginingProcess: async function(dispatch: any, pyaload: any) {},
  logoutingProcess: function(dispatch: Dispatch) {},
  globalProcess: function(dispatch: Dispatch) {
    // dispatch(upgradeConfig({h:2,a:1,b:2,d:new Date().getTime()}))
  }
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
  stateReconciler: autoMergeLevel1,
  whitelist: ['appReducer', 'screenReducer']
};

const makeRootReducer: CombinedState<any> = (asyncReducers: any) => {
  return persistReducer(
    persistConfig,
    combineReducers({
      ...asyncReducers
    })
  );
};

// const screenSaver = new ScreenSaver({
//   locker: new MachineLocker(),
//   duration: 5 * 60 * 1000
// });

const store = new StoreManager(
  {
    //@ts-ignore
    router: connectRouter(history)
    // screenReducer: saverReducer
  },
  [
    createLogger(),
    messageMiddleware,
    createPassport,
    routerMiddleware(history),
    createRouter()
    // createSaverMiddleware(screenSaver)
  ],
  makeRootReducer
);

const persistor = persistStore(store.getStore(), {}, function() {
  store.getStore().dispatch(passportMiddleware.fetchConfig({}));
});
export {history, persistor};
export default store;
