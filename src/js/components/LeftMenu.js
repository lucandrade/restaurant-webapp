'use strict';

import { Router, Route, Link, browserHistory } from 'react-router'
import { Drawer, MenuItem } from 'material-ui';

import React from 'react';

export default class LeftMenu extends React.Component {
    handleNavigate(to) {
        this.props.onNavigate(to);
    }

    render() {
        const { opened } = this.props;
        const style = {
            zIndex: '1099',
            paddingTop: '90px'
        }
        return (
            <Drawer containerStyle={style} open={opened}>
                <MenuItem onClick={this.handleNavigate.bind(this, '/home')}>Home</MenuItem>
                <MenuItem onClick={this.handleNavigate.bind(this, '/produtos')}>Produtos</MenuItem>
            </Drawer>
        );
    }
}
