// Core
import React from 'react';
import PropTypes from 'prop-types';

// Component
import { Input } from 'reas';

const ActionFormSelect = (props) => {
    return (
        <Input as="select" id={props.id}>
            {props.items.map(function(item, i) {
                return <option key={i} value={item.val}>{item.name}</option>;
            })}
        </Input>
    );
};

ActionFormSelect.propTypes = {
    id:    PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default ActionFormSelect;