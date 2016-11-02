'use strict';

import React from 'react';

import { TextField, RaisedButton, Paper } from 'material-ui';

export default class Login extends React.Component {
    componentWillMount() {
        document.body.className = "login";
    }

    componentWillUnmount() {
        document.body.className = "";
    }

    render() {
        return (
            <div className="login-container">
                <div className="form">
                    <input placeholder="Login" />
                    <input type="password" placeholder="Senha" />
                    <button>entrar</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                </div>
            </div>
        );
    }
}
