// Core
import  React from 'react';

// Components
import { styled, Group } from 'reas';

// Styled CSS
const MyGroup = styled(Group)`
    margin:5px 0;
`;

const ActionFormGroup = (props) => {
    return <MyGroup>{props.children}</MyGroup>;
};

export default ActionFormGroup;
