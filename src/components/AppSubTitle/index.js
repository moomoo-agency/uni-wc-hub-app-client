// Core
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Heading } from 'reas';

const AppSubTitle = (props) => {
    return <Heading
        as="h4"
        textAlign="center">
        {props.text}
    </Heading>;
};

AppSubTitle.propTypes = {
    text: PropTypes.string.isRequired
};

export default AppSubTitle;
