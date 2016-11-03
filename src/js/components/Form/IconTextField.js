'use strict';

import React from 'react';

export default class IconTextField extends React.Component {
    render() {
        let { position, icon, field } = this.props;
        position = position || 'left';
        icon = icon || '';
        field = field || '';
        return (
            <div className={position + ' icon-field'}>
                <div className='icon'>
                    {icon}
                </div>
                <div className='field'>
                    {field}
                </div>
            </div>
        );
    }
}
