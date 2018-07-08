// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { styled, Flex, Block, Heading, Button } from 'reas';

// Context
import { AppContext } from '../../helpers/context';

// Styled CSS
const ButtonsWrapper = styled(Block)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:400px;
    margin:auto;
`;
const OrdersButton = styled(Button)`
    margin-bottom:12px;
`;

class Home extends Component {
    static propTypes = {
        user:       PropTypes.shape({
            name:  PropTypes.string,
            email: PropTypes.string,
            token: PropTypes.string
        }),
        switchPage: PropTypes.func.isRequired
    };

    _goToSales = () => {
        const { switchPage } = this.props;

        switchPage('sales');
    };

    render () {
        const { user } = this.props;

        return (
            <Flex
                flexDirection="column"
                justifyContent="center">
                <ButtonsWrapper>
                    <Heading
                        as="h4"
                        className="gloria-font"
                        textAlign="center">
                        Hello {user.name}!
                    </Heading>
                    <OrdersButton
                        className="gloria-font"
                        onClick={this._goToSales}>Sales</OrdersButton>
                </ButtonsWrapper>
            </Flex>
        );
    }
}

export default props => (
    <AppContext.Consumer>
        {({ user, switchPage }) => <Home
            {...props}
            user={user}
            switchPage={switchPage}/>}
    </AppContext.Consumer>
);
