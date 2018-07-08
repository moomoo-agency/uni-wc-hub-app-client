// Core
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { styled, Inline } from 'reas';

// Styled CSS
const ErrorInline = styled(Inline)`
    color:red;
`;

const ErrorText = (props) => {
    return (props.override
        ? <ErrorInline>{props.msg}</ErrorInline>
        : <ErrorInline>Error: {props.msg}. Please, log out and then log in again.</ErrorInline>);
};

ErrorText.propTypes = {
    msg: PropTypes.string.isRequired,
    override: PropTypes.bool.isRequired
};

export default ErrorText;
