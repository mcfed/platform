import React, {ComponentType} from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import {PersistGate} from 'redux-persist/integration/react';
import {ConnectedRouter} from 'connected-react-router';
import {createStore} from '@user-center/app/lib/store/index';

import * as DemoModule from '.';

import 'antd/dist/antd.css';

const {store, persistor, history} = createStore();

global.API_PREFIX = process.env.npm_package_config_API_SERVER as string;

const App = () => (
  <Provider store={store.getStore()}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <IntlProvider locale='zh-CN' onError={function(err) {}}>
          <Router>
            <Switch>
              <Route
                path='/'
                //@ts-ignore
                component={store.loadRouterModule(DemoModule)}></Route>
            </Switch>
          </Router>
        </IntlProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

const render = (Component: ComponentType) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// serviceWorker.unregister();
