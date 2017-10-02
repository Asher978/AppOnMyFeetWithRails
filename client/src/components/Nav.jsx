import React from 'react';

import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import Auth from '../modules/Auth';

const Nav = props => {
    return (
        <Segment inverted>
        <Menu inverted secondary>
            <Menu.Item><Link to="/">Home</Link></Menu.Item>
            {!Auth.isUserAuthenticated() ? (
                <Menu inverted secondary>
                    <Menu.Item><Link to="/login">Login</Link></Menu.Item>
                    <Menu.Item><Link to="/register">Register</Link></Menu.Item>
                </Menu>
            ) : (
                <Menu.Item><Link to="/logout" onClick={props.logoutUser}>Log Out</Link></Menu.Item>
            )}
        </Menu>
        </Segment>
    )
}

export default Nav;