import React, {ComponentType} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import {PersistGate} from 'redux-persist/integration/react';
import {ConnectedRouter} from 'connected-react-router';
import { createHashHistory } from 'history';
import {store,persistor} from '@platform/app';

import * as Module from '.';

const history = createHashHistory()

global.API_PREFIX = process.env.npm_package_config_API_SERVER as string;
global.GRAPHQL_API_PREFIX = process.env.npm_package_config_GRAPHQL_API_SERVER as string;

const App = () => (
  <Provider store={store.getStore()}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
          <Router>
            <Switch>
              <Route
                path='/'
                component={store.loadRouterModule(Module)}></Route>
            </Switch>
          </Router>
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
