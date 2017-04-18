import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';

import 'font-awesome/scss/font-awesome.scss';
import './scss/main.scss';

import fmApp from './reducers';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
    fmApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('main'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', render(App));
}
