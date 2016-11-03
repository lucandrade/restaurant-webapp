'use strict';

import React from 'react';
import { Card, CardText } from 'material-ui/Card';

import TopBar from './components/TopBar';
import LeftMenu from './components/LeftMenu';
import AppStore from './stores/AppStore';
import Request from './utils/Request';
import Storage from './utils/Storage';
import Signout from './requests/Signout';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = this.initialState();
    }

    initialState() {
        return {
            user: AppStore.getUser(),
            menuvisible: AppStore.isMenuVisible(),
        }
    }

    updateState() {
        this.setState(this.initialState());
    }

    componentDidMount() {
        AppStore.on('change_user', this.updateState);
        AppStore.on('change_menu', this.updateState);
    }

    componentWillUnmount() {
        AppStore.removeListener('change_user', this.updateState);
        AppStore.removeListener('change_menu', this.updateState);
    }

    handleMenuOpen() {
        AppStore.toggleMenu();
    }

    handleNavigate(to) {
        AppStore.setPage(to);
    }

    handleLogout() {
        Signout(() => {
            AppStore.setUser(false);
            Storage.forget('token');
            Request.defaults.headers = {};
            AppStore.setPage('/login');
            AppStore.showMessage('Usuário deslogado');
        });
    }

    render() {
        const { user, menuvisible } = this.state;
        const cardStyle = {
            margin: '20px'
        }
        return (
            <div>
                <TopBar
                    user={user}
                    onToggleMenu={this.handleMenuOpen.bind(this)}
                    onLogout={this.handleLogout.bind(this)} />
                <LeftMenu onNavigate={this.handleNavigate.bind(this)} opened={menuvisible} />
                <Card style={cardStyle}>
                    <CardText children={this.props.children} />
                </Card>
            </div>
        );
    }
}

export default Main;
