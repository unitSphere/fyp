import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (localStorage.getItem("user")) {
                return <Component {...props} />;
            }
            else {
                return <Redirect to={{ pathname: "/Signup", state: { from: props.location } }} />;
            }
        }} />
    );
};