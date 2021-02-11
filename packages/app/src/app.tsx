import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AppLocale from './locales';
import store, {history, persistor} from './store';
import './app.css';
// import 'antd/dist/antd.css';
// import 'core-js/stable';
import {ConnectedRouter} from 'connected-react-router';
import {BasicLayout} from './layout';

global.API_PREFIX = '';
if (process.env.NODE_ENV === 'development') {
  global.API_PREFIX = '/usercenter';
}

const App = () => (
  <Provider store={store.getStore()}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <AppLocale>
          <Router>
            <Switch>
              <Route path='/' component={BasicLayout} />
              <Redirect exact from='/' to='/dashboard'></Redirect>
            </Switch>
          </Router>
        </AppLocale>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

const render = (Component: any) => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

render(App);
//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept(() => {
    render(App);
  });
}

// serviceWorker.unregister();
