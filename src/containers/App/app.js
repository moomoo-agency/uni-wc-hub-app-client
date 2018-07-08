// Core
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// Components
import { Flex } from 'reas';
import AppNavigation from '../../components/AppNavigation';
import AppTitle from '../../components/AppTitle';
import Login from '../../components/Login';
import Home from '../../components/Home';
import Sales from '../../components/Sales';

// Context
import { AppContext } from '../../helpers/context';

// Helpers
import { prepareChartData } from '../../helpers/helpers';

export default class App extends Component {
    constructor (props) {
        super(props);

        this.loginUser = (user) => {
            const { serverUrl } = this.state;
            const { name } = user;
            const io = socketIOClient(serverUrl);

            io.emit('handshake', {
                name,
                msg: 'Hello server!'
            });

            this.setState({
                user:   { ...user },
                socket: io
            });
        };

        this.logoutUser = () => {
            this.setState({
                user:        {
                    name:  '',
                    email: '',
                    token: ''
                },
                currentPage: 'login',
                socket:      null
            });
        };

        this.switchPage = (page) => {
            this.setState({
                currentPage: page
            });
        };

        this.getSalesReport = (data) => {
            const { token } = this.state.user;
            const { socket } = this.state;

            this.setState({
                isLoading: true
            });

            socket.emit(
                'request-sales',
                {
                    'Authorization': token,
                    data
                },
                (data) => {
                    if (data.statusCode === 401) {
                        this.setState({
                            isError:  true,
                            errorMsg: data.message
                        });
                    }
                }
            );

            socket.on('sales', (data) => {
                const preparedData = prepareChartData(data);
                const chartData = {
                    labels:   preparedData.labels,
                    datasets: [
                        {
                            label:                'Sales',
                            backgroundColor:      'rgba(255,99,132,0.2)',
                            borderColor:          'rgba(255,99,132,1)',
                            borderWidth:          1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor:     'rgba(255,99,132,1)',
                            data:                 preparedData.data
                        }
                    ]
                };
                this.setState({
                    report:    chartData,
                    isLoading: false,
                    isError:   false,
                });
            });
        };

        this.state = {
            user:           {
                name:  '',
                email: '',
                token: ''
            },
            currentPage:    'home',
            serverUrl:      'http://localhost:3030',
            socket:         null,
            isLoading:      false,
            isError:        false,
            errorMsg:       '',
            loginUser:      this.loginUser,
            logoutUser:     this.logoutUser,
            switchPage:     this.switchPage,
            report:         {},
            getSalesReport: this.getSalesReport
        };
    }

    render () {
        const { name } = this.state.user;
        const { currentPage } = this.state;
        const content = !name
            ? <Login/>
            : currentPage === 'sales'
                ? <Sales/>
                : <Home/>;

        return (
            <AppContext.Provider value={this.state}>
                <Flex
                    as="section"
                    justifyContent="center"
                    flexDirection="column">
                    <AppNavigation/>
                    <AppTitle/>
                    {content}
                </Flex>
            </AppContext.Provider>
        );
    }
}
