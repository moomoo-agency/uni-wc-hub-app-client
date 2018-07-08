// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Components
import { styled, Button, Inline } from 'reas';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import ContentWrapper from '../ContentWrapper';
import AppSubTitle from '../AppSubTitle';
import ErrorText from '../ErrorMsg';
import ActionFormWrapper from '../ActionFormWrapper';
import ActionFormGroup from '../ActionFormGroup';
import ActionFormLabel from '../ActionFormLabel';
import ActionFormSelect from '../ActionFormSelect';
import Chart from '../Chart';

// Context
import { AppContext } from '../../helpers/context';

// Tools
import { sites } from '../../helpers/config';

// CSS
import 'react-day-picker/lib/style.css';

// Styled CSS
const ButtonBlue = styled(Button)`
    background-color:#d4f7ff;
`;
const ButtonGreen = styled(Button)`
    background-color:#c4f5c6;
`;

const formatDateFunc = (v, f) => dayjs(v).format(f);

class Sales extends Component {
    static propTypes = {
        user:           PropTypes.shape({
            name:  PropTypes.string,
            email: PropTypes.string,
            token: PropTypes.string
        }),
        report:         PropTypes.object.isRequired,
        getSalesReport: PropTypes.func.isRequired,
        isLoading:      PropTypes.bool.isRequired,
        isError:        PropTypes.bool.isRequired,
        errorMsg:       PropTypes.string.isRequired
    };

    _periodYear = () => {
        const data = {
            id:    document.getElementById('site').value,
            range: {
                startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
                endDate:   dayjs().format('YYYY-MM-DD')
            }
        };
        this._range(data);
    };

    _periodLastMonth = () => {
        const data = {
            id:    document.getElementById('site').value,
            range: {
                startDate: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                endDate:   dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
            }
        };
        this._range(data);
    };

    _periodThisMonth = () => {
        const data = {
            id:    document.getElementById('site').value,
            range: {
                startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
                endDate:   dayjs().endOf('month').format('YYYY-MM-DD')
            }
        };
        this._range(data);
    };

    _periodLastSevenDays = () => {
        const data = {
            id:    document.getElementById('site').value,
            range: {
                startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
                endDate:   dayjs().format('YYYY-MM-DD')
            }
        };
        this._range(data);
    };

    _customRange = () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const site = document.getElementById('site').value;

        if (site && dayjs(startDate).isValid() && dayjs(endDate).isValid()) {
            const data = {
                id:    site,
                range: { startDate, endDate }
            };
            this._range(data);
        }
    };

    _range = (data) => {
        const { getSalesReport } = this.props;
        getSalesReport(data);
    };

    render () {
        const { report, isLoading, isError, errorMsg } = this.props;
        const content = typeof report.labels !== 'undefined' && !isLoading && !isError
            ? <Chart report={report}/>
            : (isError
                ? <ErrorText msg={errorMsg} override={false}/>
                : (isLoading
                    ? <Inline>Loading...</Inline>
                    : <Inline>No data. Please, choose a period or custom start/end dates.</Inline>));

        return (
            <ContentWrapper>
                <AppSubTitle text="Sales by Date"/>
                <ActionFormWrapper>
                    <ActionFormGroup>
                        <ActionFormLabel htmlFor="site">Select site</ActionFormLabel>
                        <ActionFormSelect
                            id="site"
                            items={sites}/>
                    </ActionFormGroup>
                    <ActionFormGroup>
                        <ButtonBlue
                            className="gloria-font"
                            onClick={this._periodYear}>Year</ButtonBlue>
                        <ButtonBlue
                            className="gloria-font"
                            onClick={this._periodLastMonth}>Last month</ButtonBlue>
                        <ButtonBlue
                            className="gloria-font"
                            onClick={this._periodThisMonth}>This month</ButtonBlue>
                        <ButtonBlue
                            className="gloria-font"
                            onClick={this._periodLastSevenDays}>Last 7 days</ButtonBlue>
                        <DayPickerInput
                            inputProps={{ id: 'startDate' }}
                            format="YYYY-MM-DD"
                            formatDate={formatDateFunc}
                            placeholder="start date"/>
                        <DayPickerInput
                            inputProps={{ id: 'endDate' }}
                            format="YYYY-MM-DD"
                            formatDate={formatDateFunc}
                            placeholder="end date"/>
                        <ButtonGreen
                            className="gloria-font"
                            onClick={this._customRange}>Submit</ButtonGreen>
                    </ActionFormGroup>
                </ActionFormWrapper>
                {content}
            </ContentWrapper>
        );
    }
}

export default props => (
    <AppContext.Consumer>
        {({ user, report, getSalesReport, isLoading, isError, errorMsg }) => <Sales
            {...props}
            report={report}
            getSalesReport={getSalesReport}
            isLoading={isLoading}
            isError={isError}
            errorMsg={errorMsg}
            user={user}/>}
    </AppContext.Consumer>
);