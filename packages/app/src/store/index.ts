import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { StoreManager, Middleware } from '@mcfed/core';
import { messageMiddleware } from './redux-message';
import { createRouter } from './redux-router';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Dispatch, combineReducers, CombinedState } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
//@ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const { passportMiddleware } = Middleware;

const history = createHashHistory();

const createPassport = passportMiddleware.default({
  loginingProcess: async function (dispatch: any, pyaload: any) {

  },
  logoutingProcess: function (dispatch: Dispatch) {

  },
  globalProcess: function (dispatch: Dispatch) {

  }
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: 10,
  stateReconciler: autoMergeLevel2,
  whitelist: ['appReducer']
};

const makeRootReducer: CombinedState<any> = (asyncReducers: any) => {
  return persistReducer(
    persistConfig,
    combineReducers({
      ...asyncReducers
    })
  );
};

const store = new StoreManager(
  history,
  {
    //@ts-ignore
    router: connectRouter(history)
  },
  [
    createLogger(),
    messageMiddleware,
    createPassport,
    routerMiddleware(history),
    createRouter()
  ],
  makeRootReducer
);

const persistor = persistStore(store.getStore());


store.getStore().dispatch(passportMiddleware.fetchConfig({}));
export { history, persistor }
export default store

