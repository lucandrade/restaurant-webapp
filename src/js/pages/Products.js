'use strict';

import React from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AppStore from '../stores/AppStore';

export default class Products extends React.Component {
    handleAdd() {
        AppStore.setPage('/produto');
    }
    
    render() {
        const data = Array.apply(0, Array(100));
        return (
            <div>
                Produtos
                {data.map((f, i) => { return <p key={i}>teste</p> })}
                <FloatingActionButton onClick={this.handleAdd.bind(this)} className='floating-action-button'>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}
