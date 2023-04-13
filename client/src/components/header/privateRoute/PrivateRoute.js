import React from 'react';
import { Navigate } from 'react-router-dom';

const isLoggedInValue = localStorage.getItem("isLoggedIn");

const PrivateRoute = ({ children, isLoggedIn }) => {
    return (isLoggedInValue ? children : <Navigate to='/signin' /> );
}

const LoggedInPrivateRoute = ({ children, isLoggedIn }) => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");

    return (isLoggedInValue ? <Navigate to='/dashboard' />: children );
}

export {PrivateRoute, LoggedInPrivateRoute};