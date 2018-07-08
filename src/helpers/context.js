// context
import React from 'react';

const data = {
    user:           {
        name:  '',
        email: '',
        token: ''
    },
    currentPage:    '',
    serverUrl:      '',
    socket:         null,
    isLoading:      false,
    isError:        false,
    errorMsg:       '',
    loginUser:      () => {},
    logoutUser:     () => {},
    switchPage:     () => {},
    report:         {},
    getSalesReport: () => {}
};
export const AppContext = React.createContext(data);