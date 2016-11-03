'use strict';

import React from 'react';
import { browserHistory, hashHistory, Router, Route, Link, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Snackbar } from 'material-ui';

import Main from './Main';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import AppStore from './stores/AppStore';
import IsAuthenticated from './requests/IsAuthenticated';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initialState = this.initialState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.state = this.initialState();
        this.checkUser();
    }

    checkUser() {
        const me = this;
        IsAuthenticated((response) => {
            if (response.status && response.data && response.data.user) {
                const path = me.context.router.location.pathname;
                AppStore.setUser(response.data.user);

                if (path == '/login') {
                    AppStore.setPage('/home');
                } else {
                    AppStore.setPage(path);
                }
            } else {
                AppStore.setUser(false);
                AppStore.setPage('/login');
            }
        });
    }

    initialState() {
        return {
            user: AppStore.getUser(),
            page: AppStore.getPage(),
            message: AppStore.getMessage()
        }
    }

    updateState() {
        const state = this.initialState();
        this.setState(state);

        const { user, page } = state;
        const path = this.context.router.location.pathname;

        AppStore.closeMenu();

        if (!page) {
            return;
        }

        if (page == path) {
            return;
        }

        this.context.router.push(page);
    }

    componentDidMount() {
        AppStore.on('change_user', this.updateState);
        AppStore.on('change_page', this.updateState);
        AppStore.on('change_message', this.updateState);
    }

    componentWillUnmount() {
        AppStore.removeListener('change_user', this.updateState);
        AppStore.removeListener('change_page', this.updateState);
        AppStore.removeListener('change_message', this.updateState);
    }

    handleCloseMessage() {
        AppStore.hideMessage();
    }

    render() {
        const { user, message } = this.state;
        let text;

        if (typeof message.text == 'string') {
            text = message.text;
        } else {
            const messages = [];

            for (var m in message.text) {
                messages.push(message.text[m]);
            }

            text = messages.join(', ');
        }

        const snack = <Snackbar
            open={message.visible}
            message={text}
            autoHideDuration={message.duration}
            onRequestClose={this.handleCloseMessage.bind(this)} />;

        let view = <div>
            {this.props.children}
            {snack}
        </div>;

        if (user && user.id) {
            view = <Main>
                {this.props.children}
                {snack}
            </Main>;
        }

        return (
            <MuiThemeProvider>
                {view}
            </MuiThemeProvider>
        )
    }
};

App.contextTypes = {
    router: React.PropTypes.object
};

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="login" component={Login} />
                    <Route path="home" component={Home} />
                    <Route path="produtos" component={Products} />
                    <Route path="produto" component={Product} />
                    <Route path="produto/:id" component={Product} />
                </Route>
            </Router>
        );
    }
}
