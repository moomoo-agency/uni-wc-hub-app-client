// Core
import React from 'react';

// Components
import { styled, Navigation } from 'reas';
import GoBackLink from '../../components/GoBackLink';
import LogOutLink from '../../components/LogOutLink';

// Styled CSS
const MyNavigation = styled(Navigation)`
    display:flex;
    justify-content:flex-end;
    height:70px;
    
    @media (max-width: 480px) {
        height:30px;
    }
`;

const AppNavigation = () => {
    return (
        <MyNavigation>
            <GoBackLink/>
            <LogOutLink/>
        </MyNavigation>
    );
};

export default AppNavigation;
