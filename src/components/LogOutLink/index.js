// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { styled, Link } from 'reas';

// Context
import { AppContext } from '../../helpers/context';

// Styled CSS
const MyLink = styled(Link)`
    margin:10px 40px 10px 0;
    cursor:pointer;
    color:red;
`;

class LogOutLink extends Component {
    static propTypes = {
        logoutUser: PropTypes.func.isRequired,
        user:       PropTypes.object.isRequired
    };

    _logOut = () => {
        const { logoutUser } = this.props;
        logoutUser();
    };

    render () {
        const { user } = this.props;

        return (!user.name
            ? null
            : <MyLink
                as="span"
                href="#"
                className="gloria-font"
                onClick={this._logOut}>
                Log out
            </MyLink>);
    }
}

export default props => (
    <AppContext.Consumer>
        {({ logoutUser, user }) => <LogOutLink
            {...props}
            logoutUser={logoutUser}
            user={user}/>}
    </AppContext.Consumer>
);
