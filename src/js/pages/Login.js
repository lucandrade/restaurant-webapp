'use strict';

import React from 'react';

import Authenticate from '../requests/Authenticate';
import Request from '../utils/Request';
import AppStore from '../stores/AppStore';
import Storage from '../utils/Storage';

export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            sending: false
        };
    }

    componentWillMount() {
        document.body.className = "login";
    }

    componentWillUnmount() {
        document.body.className = "";
    }

    handleChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleLogin(e) {
        e.preventDefault();
        const me = this;
        const { username, password } = this.state;

        me.setState({
            sending: true
        });

        Authenticate(username, password, (response) => {
            if (response.status) {
                AppStore.showMessage('Usuário logado');
                AppStore.setUser(response.data.user);
                Storage.set('token', response.data.token);
                Request.defaults.headers = {
                    Authorization: response.data.token
                };
                AppStore.setPage('/home');
            } else {
                AppStore.showMessage(response.message || 'Erro ao fazer login');
                me.setState({
                    sending: false
                });
            }
        });
    }

    render() {
        const { username, password, sending, error, message } = this.state;
        return (
            <div className="login-container">
                <form onSubmit={this.handleLogin.bind(this)} className="form" id="form-login">
                    <input
                        required="required"
                        value={username}
                        name="username"
                        placeholder="Login"
                        onChange={this.handleChange.bind(this)} />
                    <input
                        value={password}
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={this.handleChange.bind(this)} />
                    <button disabled={sending}>
                        {sending ? 'enviando...' : 'entrar'}
                    </button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                </form>
            </div>
        );
    }
}
