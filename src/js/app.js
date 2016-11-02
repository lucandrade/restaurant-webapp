'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppRouter from './AppRouter';

injectTapEventPlugin();

const app = document.getElementById('app');

ReactDOM.render(<AppRouter />, app);
