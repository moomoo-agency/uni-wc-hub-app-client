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
`;

class GoBackLink extends Component {
    static propTypes = {
        currentPage: PropTypes.string.isRequired,
        switchPage:  PropTypes.func.isRequired
    };

    _goHome = () => {
        const { switchPage } = this.props;
        switchPage('home');
    };

    render () {
        const { currentPage } = this.props;

        return (['home', 'login'].includes(currentPage)
            ? null
            : <MyLink
                as="span"
                href="#"
                className="gloria-font"
                onClick={this._goHome}>
                To the list
            </MyLink>);
    }
}

export default props => (
    <AppContext.Consumer>
        {({ currentPage, switchPage }) => <GoBackLink
            {...props}
            currentPage={currentPage}
            switchPage={switchPage}/>}
    </AppContext.Consumer>
);
