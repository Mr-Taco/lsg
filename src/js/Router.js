import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute/*, Redirect*/ } from 'react-router';
import { browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import configureStore from './store/';

import Main from './Main.js';

const store = configureStore();

function generateRouter() {
    return <Router history={browserHistory}>
        <Route path="/" component={Main} />
    </Router>;
}

class AppHandler extends Component {
    constructor() {
        super();
    }

    render() {
        return <Provider store={store}>
            {generateRouter()}
        </Provider>;
    }
}


render((
    <AppHandler />
), document.getElementById('content'));
