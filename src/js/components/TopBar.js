'use strict';

import React from 'react';
import { AppBar, IconButton, IconMenu, MenuItem, FontIcon } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class TopBar extends React.Component {
    handleLogout() {
        this.props.onLogout();
    }
    render() {
        const { user, onToggleMenu } = this.props;
        const title = user && user.name ? user.name : 'Test';
        const style = {
            zIndex: '1100'
        }

        const menu = <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem
                        onTouchTap={this.handleLogout.bind(this)}
                        primaryText="Sair"
                        leftIcon={<FontIcon className="fa fa-times" />} />
                </IconMenu>;
        return (
            <AppBar
                title={title}
                style={style}
                onLeftIconButtonTouchTap={onToggleMenu}
                iconElementRight={menu} />
        );
    }
}
