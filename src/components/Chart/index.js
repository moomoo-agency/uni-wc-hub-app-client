// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { styled, Flex } from 'reas';
import { Bar } from 'react-chartjs-2';
import AppSubTitle from '../AppSubTitle';

// Styled CSS
const ChartWrapper = styled(Flex)`
    margin:10px 30px;
    flex-direction:column;
    justify-content:center;
`;

export default class Chart extends Component {
    static propTypes = {
        report: PropTypes.object.isRequired
    };

    render () {
        const { report } = this.props;

        return (
            <ChartWrapper>
                <AppSubTitle text="Statistics"/>
                <Bar
                    data={report}
                    width={20}
                    height={350}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </ChartWrapper>
        );
    }
}
