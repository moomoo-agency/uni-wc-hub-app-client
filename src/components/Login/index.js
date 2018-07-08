// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Components
import { styled, Flex, Block, Input, Button } from 'reas';
import ErrorText from '../ErrorMsg';

// context
import { AppContext } from '../../helpers/context';

// styled CSS
const FormWrapper = styled(Block)`
    display:flex;
    justifyContent:center;
    flex-direction:column;
    width:400px;
    margin:30px auto 0;
`;

const MyInput = styled(Input)`
    margin-bottom:12px;
`;

class Login extends Component {
    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        serverUrl: PropTypes.string.isRequired
    };

    state = {
        isError:  false,
        errorMsg: ''
    };

    _auth = (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;
        const { loginUser } = this.props;

        if (email && pass) {
            this._apiCall(email, pass)
                .then((data) => {
                    if (typeof data !== 'undefined') {
                        loginUser(data);
                    }
                });
        }
    };

    _apiCall = (email, pass) => {
        const { serverUrl } = this.props;

        return axios.post(`${serverUrl}/api/auth`,
            { email, pass },
            { withCredentials: true })
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                if (err.response.data) {
                    const { statusCode, error, message } = err.response.data;
                    this.setState({
                        isError:  true,
                        errorMsg: `${error} (${statusCode}): ${message}`
                    });
                } else {
                    console.log(err);
                }
            });
    };

    render () {
        const { isError, errorMsg } = this.state;
        const content = isError
            ? <ErrorText msg={errorMsg} override/>
            : null;

        return (
            <Flex
                flexDirection="column"
                justifyContent="center">
                <FormWrapper
                    as="form"
                    onSubmit={this._auth}>
                    <MyInput
                        id="email"
                        className="gloria-font"
                        placeholder="Enter email"
                        type="email"
                        required/>
                    <MyInput
                        id="pass"
                        className="gloria-font"
                        placeholder="Enter password"
                        type="password"
                        required/>
                    <Button
                        as="button"
                        className="gloria-font"
                        type="submit">Submit</Button>
                    {content}
                </FormWrapper>
            </Flex>
        );
    }
}

export default props => (
    <AppContext.Consumer>
        {({ loginUser, serverUrl }) => <Login
            {...props}
            serverUrl={serverUrl}
            loginUser={loginUser}/>}
    </AppContext.Consumer>
);
