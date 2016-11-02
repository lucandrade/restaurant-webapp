'use strict';

import React from 'react';

import TopBar from './components/TopBar';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <TopBar />
                {this.props.children}
            </div>
        );
    }
}
