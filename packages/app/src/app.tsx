import React from 'react';
import ReactDOM from 'react-dom';
// import { IntlProvider } from "react-intl";
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppContainer} from 'react-hot-loader';

import AppLocale from './locales';
import BasicLayout from './layouts/BasicLayout';
import ProtalLayout from './layouts/PortalLayout';
import store, {history, persistor} from './store';
import './app.less';
import 'antd/dist/antd.css';
// import 'core-js/stable';
import {ConnectedRouter} from 'connected-react-router';

global.API_PREFIX = '';
if (process.env.NODE_ENV === 'development') {
  global.API_PREFIX = '/usercenter';
}

const LOGIN_TYPE = 'GLOBAL/LOGIN_ACTION';
//@ts-ignore
global.LOGIN_TYPE = LOGIN_TYPE;

const App = () => (
  <Provider store={store.getStore()}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <AppLocale>
          <Router>
            <Switch>
              <Route path='/portal' component={ProtalLayout} />
              <Redirect exact from='/' to='/dashboard'></Redirect>
              <Route path='/' component={BasicLayout} />
            </Switch>
          </Router>
        </AppLocale>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// serviceWorker.unregister();
