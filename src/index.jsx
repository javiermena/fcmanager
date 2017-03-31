import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'font-awesome/scss/font-awesome.scss';
import './scss/main.scss';

import App from './components/App';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('main'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', render(App));
}
