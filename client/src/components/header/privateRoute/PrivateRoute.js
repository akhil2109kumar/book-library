import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
 
    // if (pathName.includes("/signin") && isLoggedInValue == 'true') {
    //     console.log("logged in && signin")
    //     return children
    // }
    // return children;


    return (isLoggedInValue ? children : <Navigate to='/signin' /> );
}

const LoggedInPrivateRoute = ({ children, isLoggedIn }) => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
 
    // if (pathName.includes("/signin") && isLoggedInValue == 'true') {
    //     console.log("logged in && signin")
    //     return children
    // }
    // return children;


    return (isLoggedInValue ? <Navigate to='/dashboard' />: children );
}

export {PrivateRoute, LoggedInPrivateRoute};