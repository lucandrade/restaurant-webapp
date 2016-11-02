'use strict';

import React from 'react';
import { browserHistory, hashHistory, Router, Route, Link, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './Main';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';

const App = React.createClass({
    render() {
        return (
            <MuiThemeProvider>
                <Main>
                    {this.props.children}
                </Main>
            </MuiThemeProvider>
        )
    }
});

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/login" component={Login} />
                <Route path="/" component={App}>
                    <Route path="home" component={Home} />
                    <Route path="produtos" component={Products} />
                </Route>
            </Router>
        );
    }
}
