'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home';
import Login from './pages/Login';

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Login />
    </MuiThemeProvider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
